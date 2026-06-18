"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const PASOS = [
  { emoji: "🧠", texto: "Analizando tu historia..." },
  { emoji: "✍️", texto: "Preparando la letra..." },
  { emoji: "🎼", texto: "Componiendo la melodía..." },
  { emoji: "🎤", texto: "Grabando la voz cantada..." },
  { emoji: "🎚️", texto: "Mezclando y masterizando..." },
  { emoji: "✨", texto: "¡Últimos toques mágicos!" },
];

export default function GenerandoPage() {
  const router = useRouter();
  const [pasoActual, setPasoActual] = useState(0);
  const [progreso, setProgreso] = useState(0);
  const [estado, setEstado] = useState<"generando" | "listo" | "error">("generando");
  const [debugInfo, setDebugInfo] = useState<{letra: string; estilo: string; tono: string; style: string} | null>(null);
  const [debugVisible, setDebugVisible] = useState(false);
  const iniciado = useRef(false);

  useEffect(() => {
    if (iniciado.current) return;
    iniciado.current = true;
    generarCancion();
  }, []);

  async function generarCancion() {
    const letra = localStorage.getItem("micancion_letra") ?? "";
    const pedidoRaw = localStorage.getItem("micancion_pedido");
    const pedido = pedidoRaw ? JSON.parse(pedidoRaw) : {};
    const estilos: string[] = pedido.estilos ?? [];
    const instrumentos: string[] = pedido.instrumentos ?? [];
    const tono = pedido.tono ?? "";
    const titulo = pedido.titulo ?? "Mi Canción";

    // Mostrar debug info
    const ESTILOS: Record<string, string> = {
      "Mariachi": "mariachi, trumpets, guitarron, vihuela, guitarras, mexican mariachi",
      "Corrido": "corrido mexicano, acoustic guitar, accordion, storytelling, norteño",
      "Banda": "banda sinaloense, tubas, clarinets, brass, mexican banda",
      "Norteño": "norteño, accordion, bajo sexto, mexican folk",
      "Balada": "romantic ballad, piano, strings, soft vocals",
      "Pop": "pop, modern production, catchy melody, upbeat",
      "Cumbia": "cumbia, accordion, tropical, festive rhythm",
      "Urbano": "reggaeton, urban latin, trap, modern beats",
      "Góspel": "gospel, choir, uplifting, spiritual, piano",
      "IA decide": "pop, emotional, heartfelt vocals",
    };
    const TONOS: Record<string, string> = {
      "Emotivo": "emotional, heartfelt", "Alegre": "happy, joyful, upbeat",
      "Romántico": "romantic, tender, loving", "Intenso": "intense, powerful, dramatic",
      "Relajado": "relaxed, calm, mellow",
    };
    const estiloTags = estilos.length > 0 ? estilos.map((e: string) => ESTILOS[e] ?? e).join(", ") : "pop";
    const instrTags = instrumentos.length > 0 ? instrumentos.join(", ") : "";
    const toneTag = TONOS[tono] ?? "";
    const extras = pedido.extras ?? {};
    const extraTags: string[] = [];
    if (extras.coro_doble)      extraTags.push("double chorus");
    if (extras.bridge)          extraTags.push("emotional bridge");
    if (extras.intro_piano)     extraTags.push("piano intro");
    if (extras.final_dramatico) extraTags.push("dramatic ending");
    const fullStyle = [estiloTags, instrTags, toneTag, ...extraTags].filter(Boolean).join(", ");
    setDebugInfo({ letra: letra.slice(0, 300), estilo: estilos.join(" + ") || "IA decide", tono, style: fullStyle });

    // Animación de progreso — 2 min aprox
    const DURACION_ANIM = 120000;
    const inicio = Date.now();
    const animInterval = setInterval(() => {
      const elapsed = Date.now() - inicio;
      const pct = Math.min((elapsed / DURACION_ANIM) * 85, 85);
      setProgreso(pct);
      setPasoActual(Math.min(Math.floor(elapsed / (DURACION_ANIM / PASOS.length)), PASOS.length - 1));
    }, 500);

    try {
      // 1. Iniciar generación en Suno
      const genRes = await fetch("/api/suno/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ letra, estilos: pedido.estilos ?? [], instrumentos: pedido.instrumentos ?? [], tono: pedido.tono ?? "", titulo, extras: pedido.extras ?? {} }),
      });

      if (!genRes.ok) throw new Error("Error iniciando generación");
      const { taskId } = await genRes.json();
      if (!taskId) throw new Error("Sin taskId");

      console.log("Suno taskId:", taskId);

      // 2. Polling cada 8s hasta SUCCESS (max 5 min)
      const MAX_INTENTOS = 37;
      let intentos = 0;

      while (intentos < MAX_INTENTOS) {
        await new Promise(r => setTimeout(r, 8000));
        intentos++;

        const statusRes = await fetch(`/api/suno/status?taskId=${taskId}`);
        const statusData = await statusRes.json();
        console.log(`Suno poll ${intentos}:`, statusData.status);

        if (statusData.status === "SUCCESS") {
          clearInterval(animInterval);
          localStorage.setItem("micancion_audio_url", statusData.audioUrl ?? "");
          if (statusData.imageUrl) localStorage.setItem("micancion_cover_url", statusData.imageUrl);
          if (statusData.duration) localStorage.setItem("micancion_duracion", String(statusData.duration));
          setProgreso(100);
          setPasoActual(PASOS.length - 1);
          setEstado("listo");
          setTimeout(() => router.push("/resultado"), 800);
          return;
        }

        if (statusData.status === "ERROR") {
          throw new Error(statusData.error ?? "Error en Suno");
        }
      }

      throw new Error("Timeout esperando la canción");
    } catch (err) {
      console.error("Error generando canción:", err);
      clearInterval(animInterval);
      setEstado("error");
      setProgreso(100);
      setTimeout(() => router.push("/resultado"), 2000);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#0D0A14",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", fontFamily: "'Nunito', sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@400;600;700&display=swap');
        @keyframes eq-bounce { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1)} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 30px rgba(212,53,143,0.4)} 50%{box-shadow:0 0 60px rgba(212,53,143,0.7)} }
      `}</style>

      <div style={{ position: "absolute", top: "20%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,53,143,0.15) 0%,transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(25,195,201,0.12) 0%,transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 420 }}>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 56 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎵</div>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: "#fff" }}>MiCanción</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 56, marginBottom: 40 }}>
          {[1,2,3,4,5,6,7,8,9].map((n) => (
            <div key={n} style={{
              width: 7, borderRadius: 4,
              background: n % 3 === 0 ? "#D4358F" : n % 3 === 1 ? "#FF6B4A" : "#19C3C9",
              animation: `eq-bounce ${0.6 + (n * 0.07)}s ease ${n * 0.08}s infinite`,
              height: `${25 + (n * 4) % 35}px`,
              transformOrigin: "bottom",
            }} />
          ))}
        </div>

        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(26px,5vw,36px)", color: "#fff", textAlign: "center", marginBottom: 10, lineHeight: 1.2 }}>
          {estado === "listo" ? "¡Tu canción está lista!" : "Creando tu canción"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, textAlign: "center", marginBottom: 8 }}>
          {estado === "listo" ? "Redirigiendo..." : estado === "error" ? "Hubo un problema..." : "Suno AI está componiendo tu canción ✨"}
        </p>
        {estado === "generando" && (
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, textAlign: "center", marginBottom: 48 }}>
            Esto puede tardar 2-3 minutos. No cierres esta ventana.
          </p>
        )}

        <div style={{ width: "100%", height: 6, borderRadius: 100, background: "rgba(255,255,255,0.08)", marginBottom: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progreso}%`, background: "linear-gradient(135deg,#D4358F,#FF6B4A)", borderRadius: 100, transition: "width 0.5s ease", boxShadow: "0 0 12px rgba(212,53,143,0.6)" }} />
        </div>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, fontWeight: 700, marginBottom: 44 }}>{Math.round(progreso)}%</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
          {PASOS.map((p, i) => {
            const completado = i < pasoActual;
            const activo = i === pasoActual;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, opacity: completado || activo ? 1 : 0.25, transition: "opacity 0.4s ease" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: completado ? "linear-gradient(135deg,#D4358F,#FF6B4A)" : activo ? "rgba(212,53,143,0.2)" : "rgba(255,255,255,0.05)",
                  border: activo ? "1.5px solid #D4358F" : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: completado ? 14 : 18, transition: "all 0.3s ease",
                  animation: activo ? "pulse-glow 1.5s ease infinite" : "none",
                }}>
                  {completado ? "✓" : p.emoji}
                </div>
                <span style={{ fontWeight: activo ? 700 : 500, fontSize: 14, color: completado ? "rgba(255,255,255,0.9)" : activo ? "#fff" : "rgba(255,255,255,0.4)", transition: "all 0.3s ease" }}>
                  {p.texto}
                </span>
                {activo && (
                  <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                    {[0,1,2].map(n => <div key={n} style={{ width: 5, height: 5, borderRadius: "50%", background: "#D4358F", animation: `eq-bounce 0.7s ease ${n * 0.15}s infinite` }} />)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Panel de debug */}
      {debugInfo && (
        <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 999, maxWidth: 360 }}>
          <button
            onClick={() => setDebugVisible(!debugVisible)}
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "6px 14px", color: "rgba(255,255,255,0.5)", fontSize: 12, cursor: "pointer", width: "100%" }}
          >
            {debugVisible ? "▼ Ocultar debug" : "▶ Ver prompt enviado a Suno"}
          </button>
          {debugVisible && (
            <div style={{ marginTop: 8, background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 14, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
              <div style={{ marginBottom: 10 }}>
                <span style={{ color: "#D4358F", fontWeight: 700 }}>Estilo:</span> {debugInfo.estilo}<br/>
                <span style={{ color: "#D4358F", fontWeight: 700 }}>Tono:</span> {debugInfo.tono}<br/>
                <span style={{ color: "#19C3C9", fontWeight: 700 }}>Style prompt → Suno:</span><br/>
                <code style={{ color: "#FF6B4A", fontSize: 11 }}>{debugInfo.style}</code>
              </div>
              <div>
                <span style={{ color: "#D4358F", fontWeight: 700 }}>Letra (primeros 300 chars):</span><br/>
                <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 4 }}>{debugInfo.letra}</pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
