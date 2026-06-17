"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const PRIMERA_PREGUNTA_GUIADO =
  `¡Hola! 🎵 Soy tu compositor personal. Vamos a crear algo único y especial.

¿Cuál es el motivo de tu canción?

1️⃣ Amor y Pareja
2️⃣ Familia
3️⃣ Cumpleaños
4️⃣ Celebración
5️⃣ Homenaje / Despedida
6️⃣ Fe y Espiritualidad
7️⃣ Corrido Personalizado
8️⃣ Migrante y Nostalgia
9️⃣ Negocio o Empresa
🔟 Divertida o Broma

Escríbeme el número o dime el motivo con tus palabras 🎶`;

const PRIMERA_PREGUNTA_LIBRE =
  "¡Hola! ✍️ Cuéntame todo lo que quieras incluir en tu canción: para quién es, la ocasión, recuerdos especiales, el estilo que prefieres... Entre más detalles, ¡mejor será el resultado!";

type Mensaje = { rol: "ia" | "usuario"; texto: string; placeholder?: string };
type ClaudeMsg = { role: "user" | "assistant"; content: string };
type Fase = "chat" | "confirmacion" | "listo";

function ChatContenido() {
  const searchParams = useSearchParams();
  const metodo = searchParams.get("metodo") ?? "hablar";
  const router = useRouter();
  const esGuiado = metodo !== "escribir";

  const [mensajes, setMensajes] = useState<Mensaje[]>([{
    rol: "ia",
    texto: esGuiado ? PRIMERA_PREGUNTA_GUIADO : PRIMERA_PREGUNTA_LIBRE,
    placeholder: esGuiado ? "Escribe el número o tu respuesta..." : "Ej: Para mi mamá que cumple 60 años...",
  }]);
  const [historial, setHistorial] = useState<ClaudeMsg[]>([]);
  const [input, setInput] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [turno, setTurno] = useState(0);
  const [fase, setFase] = useState<Fase>("chat");
  const [escuchando, setEscuchando] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  function toggleMic() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;

    if (!SR) {
      alert("Tu navegador no soporta el micrófono. Usa Chrome para esta función.");
      return;
    }

    if (escuchando) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SR();
    recognition.lang = "es-MX";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setEscuchando(true);
    recognition.onend = () => setEscuchando(false);

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onerror = () => setEscuchando(false);

    recognitionRef.current = recognition;
    recognition.start();
  }

  const preguntasMax = esGuiado ? 7 : 2;
  const progreso = fase === "listo" ? 100 : Math.min(Math.round((turno / preguntasMax) * 100), 95);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, fase]);

  async function enviar(texto: string) {
    if (!texto.trim() || enviando) return;
    setEnviando(true);

    const textoUsuario = texto.trim();
    const nuevosMensajes: Mensaje[] = [...mensajes, { rol: "usuario", texto: textoUsuario }];
    setMensajes(nuevosMensajes);
    setInput("");

    const nuevoHistorial: ClaudeMsg[] = [...historial, { role: "user", content: textoUsuario }];
    const siguienteTurno = turno + 1;

    try {
      if (fase === "chat" && siguienteTurno >= preguntasMax) {
        // Pedir resumen + pregunta de corrección
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "chat",
            messages: [...nuevoHistorial, {
              role: "user",
              content: "Haz un resumen breve y emotivo de todo lo que el usuario te contó (2-3 oraciones), y pregúntale si hay algo que quiera corregir o agregar antes de crear la canción.",
            }],
          }),
        });
        const data = await res.json();
        const texto = data.text || "¡Tengo todo! ✨ ¿Hay algo que quieras corregir o agregar?";

        // Guardar historial y cambiar fase
        localStorage.setItem("micancion_info", JSON.stringify({ historial: nuevoHistorial, metodo }));
        setMensajes([...nuevosMensajes, { rol: "ia", texto }]);
        setHistorial(nuevoHistorial);
        setTurno(siguienteTurno);
        setFase("confirmacion");

      } else if (fase === "confirmacion") {
        // El usuario agregó una corrección — actualizar historial y pasar a listo
        const historialActualizado: ClaudeMsg[] = [...nuevoHistorial, {
          role: "assistant",
          content: "Perfecto, he anotado tu corrección. ¡Tu canción va a quedar increíble!",
        }];
        localStorage.setItem("micancion_info", JSON.stringify({ historial: historialActualizado, metodo }));
        setMensajes([...nuevosMensajes, {
          rol: "ia",
          texto: "¡Anotado! 🎵 Tu corrección está incluida. Ya tengo todo lo que necesito para crear tu canción perfecta.",
        }]);
        setHistorial(historialActualizado);
        setFase("listo");

      } else {
        // Pregunta normal
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: "chat", messages: nuevoHistorial }),
        });
        const data = await res.json();
        const respuestaIA = data.text || "¡Genial! Cuéntame más...";
        const nuevoHistorialConRespuesta: ClaudeMsg[] = [...nuevoHistorial, { role: "assistant", content: respuestaIA }];

        // Detectar si Claude indica que ya tiene suficiente información
        const frasesCierre = ["tengo todo", "tengo toda la información", "voy a crear", "ahora voy a generar", "está lista para ser creada", "lista para ser creada", "puedo crear", "ya tengo todo"];
        const claudeListó = frasesCierre.some((f) => respuestaIA.toLowerCase().includes(f));

        setMensajes([...nuevosMensajes, { rol: "ia", texto: respuestaIA, placeholder: "Escribe tu respuesta..." }]);
        setHistorial(nuevoHistorialConRespuesta);
        setTurno(siguienteTurno);

        if (claudeListó) {
          localStorage.setItem("micancion_info", JSON.stringify({ historial: nuevoHistorialConRespuesta, metodo }));
          setFase("confirmacion");
        }
      }
    } catch {
      setMensajes([...nuevosMensajes, { rol: "ia", texto: "Hubo un error. ¿Puedes intentar de nuevo? 🙏" }]);
    } finally {
      setEnviando(false);
    }
  }

  function irAPropuesta() {
    router.push("/crear/propuesta");
  }

  const ultimoMensajeIA = [...mensajes].reverse().find((m) => m.rol === "ia");

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Barra de progreso */}
      <div style={{ height: 3, background: "var(--ink-200)", position: "sticky", top: 56, zIndex: 40 }}>
        <div style={{ height: "100%", width: `${progreso}%`, background: "var(--gradient-magic)", transition: "width 0.5s ease" }} />
      </div>

      {/* Indicador de paso */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 20px", borderBottom: "1px solid var(--border-subtle)",
        background: "var(--surface-card)", position: "sticky", top: 59, zIndex: 39,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>{metodo === "escribir" ? "✍️" : "🎙️"}</span>
          <span style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13, color: "var(--text-muted)" }}>
            {fase === "confirmacion" ? "¿Todo bien?" : fase === "listo" ? "¡Listo para crear!" : metodo === "escribir" ? "Modo libre" : `Pregunta ${Math.min(turno + 1, preguntasMax)} de ${preguntasMax}`}
          </span>
        </div>
        <button onClick={() => router.push("/crear")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--text-subtle)", padding: "4px 8px" }}>
          ← Cambiar método
        </button>
      </div>

      {/* Mensajes */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 16, maxWidth: 680, width: "100%", margin: "0 auto" }}>
        {mensajes.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: m.rol === "ia" ? "row" : "row-reverse", gap: 12, alignItems: "flex-start", animation: "fade-up 0.3s ease both" }}>
            {m.rol === "ia" && (
              <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: "var(--gradient-magic)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "var(--shadow-magic)" }}>🎵</div>
            )}
            <div style={{
              maxWidth: "78%", padding: "12px 16px",
              borderRadius: m.rol === "ia" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
              background: m.rol === "ia" ? "var(--surface-card)" : "var(--gradient-magic)",
              color: m.rol === "ia" ? "var(--text-body)" : "#fff",
              fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6,
              boxShadow: m.rol === "ia" ? "var(--shadow-card)" : "var(--shadow-magic)",
              whiteSpace: "pre-wrap",
            }}>
              {m.texto}
            </div>
          </div>
        ))}

        {enviando && (
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", animation: "fade-up 0.3s ease both" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: "var(--gradient-magic)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎵</div>
            <div style={{ padding: "14px 18px", borderRadius: "4px 16px 16px 16px", background: "var(--surface-card)", boxShadow: "var(--shadow-card)", display: "flex", gap: 5, alignItems: "center" }}>
              {[0, 1, 2].map((n) => (
                <div key={n} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--magenta-300)", animation: `eq-bounce 0.8s ease ${n * 0.15}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Zona de acción */}
      <div style={{ position: "sticky", bottom: 0, background: "rgba(255,249,245,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid var(--border-subtle)", padding: "16px 20px 20px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          {/* FASE: chat normal */}
          {fase === "chat" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviar(input); } }}
                  placeholder={escuchando ? "Estoy escuchando... habla ahora 🎙️" : (ultimoMensajeIA?.placeholder ?? "Escribe o usa el micrófono...")}
                  rows={3}
                  style={{ flex: 1, resize: "none", padding: "12px 16px", borderRadius: "var(--radius-lg)", border: `1.5px solid ${escuchando ? "var(--magenta-300)" : "var(--border-subtle)"}`, background: escuchando ? "var(--magenta-050)" : "var(--surface-card)", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-body)", outline: "none", lineHeight: 1.5, transition: "all 0.2s" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--magenta-300)")}
                  onBlur={(e) => { if (!escuchando) e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {/* Botón micrófono */}
                  <button
                    onClick={toggleMic}
                    title={escuchando ? "Detener" : "Hablar"}
                    style={{
                      width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                      background: escuchando ? "var(--gradient-magic)" : "var(--surface-card)",
                      border: `1.5px solid ${escuchando ? "transparent" : "var(--border-subtle)"}`,
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                      boxShadow: escuchando ? "var(--shadow-magic)" : "none",
                      transition: "all 0.2s ease",
                      animation: escuchando ? "pop 0.6s ease infinite alternate" : "none",
                    }}
                  >🎙️</button>
                  {/* Botón enviar */}
                  <button
                    onClick={() => { recognitionRef.current?.stop(); enviar(input); }}
                    disabled={!input.trim() || enviando}
                    style={{ width: 48, height: 48, borderRadius: "50%", flexShrink: 0, background: input.trim() ? "var(--gradient-magic)" : "var(--ink-200)", border: "none", cursor: input.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: input.trim() ? "var(--shadow-magic)" : "none", transition: "all 0.2s ease" }}
                  >➤</button>
                </div>
              </div>

              {/* Botón saltar al final — visible después del primer turno */}
              {turno >= 1 && (
                <button
                  onClick={() => {
                    localStorage.setItem("micancion_info", JSON.stringify({ historial, metodo }));
                    setFase("confirmacion");
                    setMensajes((prev) => [...prev, {
                      rol: "ia",
                      texto: "¡Perfecto! Ya tengo suficiente información para crear tu canción. ¿Hay algo que quieras corregir o agregar antes de continuar? Si todo está bien, presiona el botón de abajo. 🎵",
                    }]);
                  }}
                  style={{
                    width: "100%", height: 38, borderRadius: "var(--radius-full)",
                    background: "none", border: "1.5px solid var(--border-subtle)",
                    color: "var(--text-muted)", fontFamily: "var(--font-ui)",
                    fontWeight: 600, fontSize: 13, cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--magenta-300)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--magenta-700)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-subtle)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                  }}
                >
                  Ya di suficiente información →
                </button>
              )}
            </div>
          )}

          {/* FASE: confirmación */}
          {fase === "confirmacion" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fade-up 0.3s ease both" }}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="¿Algo que corregir o agregar? (opcional)"
                rows={2}
                style={{ width: "100%", resize: "none", padding: "12px 16px", borderRadius: "var(--radius-lg)", border: "1.5px solid var(--border-subtle)", background: "var(--surface-card)", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-body)", outline: "none", lineHeight: 1.5, boxSizing: "border-box" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--magenta-300)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
              />
              <button
                onClick={irAPropuesta}
                style={{ width: "100%", height: 52, borderRadius: "var(--radius-full)", background: "var(--gradient-magic)", color: "#fff", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer", boxShadow: "var(--shadow-magic)" }}
              >
                ¡Crear mi canción! ✨
              </button>
              <button
                onClick={() => enviar(input)}
                disabled={!input.trim() || enviando}
                style={{ width: "100%", height: 44, borderRadius: "var(--radius-full)", background: "none", color: input.trim() ? "var(--magenta-700)" : "var(--text-subtle)", fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 14, border: `1.5px solid ${input.trim() ? "var(--magenta-300)" : "var(--border-subtle)"}`, cursor: input.trim() ? "pointer" : "default", transition: "all 0.15s" }}
              >
                Enviar corrección →
              </button>
            </div>
          )}

          {/* FASE: listo */}
          {fase === "listo" && (
            <button
              onClick={irAPropuesta}
              style={{ width: "100%", height: 52, borderRadius: "var(--radius-full)", background: "var(--gradient-magic)", color: "#fff", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer", boxShadow: "var(--shadow-magic)", animation: "pop 0.3s ease both" }}
            >
              ¡Crear mi canción! ✨
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense>
      <ChatContenido />
    </Suspense>
  );
}
