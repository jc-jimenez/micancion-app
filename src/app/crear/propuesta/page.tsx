"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

type Extras = {
  coro_doble: boolean;
  bridge: boolean;
  intro_piano: boolean;
  final_dramatico: boolean;
};

type ConfigMusical = {
  estilo: string;
  tono: string;
  voz: string;
  tempo: string;
};

const ESTILOS = ["Mariachi", "Corrido", "Banda", "Norteño", "Balada", "Pop", "Cumbia", "Urbano", "Góspel", "IA decide"];
const TONOS = ["Emotivo", "Alegre", "Con humor", "Poético", "Intenso"];
const VOCES = ["Femenina", "Masculina", "Dueto"];
const TEMPOS = ["Lento", "Moderado", "Rápido"];

function Chip({ label, activo, onClick }: { label: string; activo: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 16px", borderRadius: "var(--radius-full)",
        border: `1.5px solid ${activo ? "var(--magenta-600)" : "var(--border-subtle)"}`,
        background: activo ? "var(--gradient-magic)" : "var(--surface-card)",
        color: activo ? "#fff" : "var(--text-muted)",
        fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13,
        cursor: "pointer", transition: "all 0.15s ease",
        boxShadow: activo ? "var(--shadow-magic)" : "none",
      }}
    >
      {label}
    </button>
  );
}

function ExtraToggle({ emoji, titulo, desc, activo, precio, onClick }: {
  emoji: string; titulo: string; desc: string;
  activo: boolean; precio: number; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        all: "unset", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 16px", borderRadius: "var(--radius-lg)",
        border: `1.5px solid ${activo ? "var(--teal-400)" : "var(--border-subtle)"}`,
        background: activo ? "var(--teal-050)" : "var(--surface-card)",
        transition: "all 0.2s ease", width: "100%",
      }}
    >
      <span style={{ fontSize: 24, flexShrink: 0 }}>{emoji}</span>
      <div style={{ flex: 1, textAlign: "left" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14, color: activo ? "var(--teal-700)" : "var(--text-strong)" }}>{titulo}</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{desc}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
        <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13, color: activo ? "var(--teal-700)" : "var(--text-muted)" }}>+${precio}</span>
        <div style={{
          width: 22, height: 22, borderRadius: "50%",
          background: activo ? "var(--teal-600)" : "var(--ink-200)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, color: "#fff", fontWeight: 700, transition: "background 0.2s",
        }}>{activo ? "✓" : "+"}</div>
      </div>
    </button>
  );
}

export default function PropuestaPage() {
  const router = useRouter();

  const [letra, setLetra] = useState("");
  const [generando, setGenerando] = useState(true);
  const [error, setError] = useState(false);
  const [letraVisible, setLetraVisible] = useState(true);
  const [config, setConfig] = useState<ConfigMusical>({
    estilo: "IA decide", tono: "Emotivo", voz: "Femenina", tempo: "Moderado",
  });
  const [extras, setExtras] = useState<Extras>({
    coro_doble: false, bridge: false, intro_piano: false, final_dramatico: false,
  });

  // Generar letra real al montar
  useEffect(() => {
    generarLetra();
  }, []);

  async function generarLetra(configOverride?: ConfigMusical) {
    setGenerando(true);
    setError(false);

    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("micancion_info") : null;
      const info = raw ? JSON.parse(raw) : null;
      const historial = info?.historial ?? [];
      const configActual = configOverride ?? config;

      // Agregar contexto de configuración musical al final del historial
      const mensajesConConfig = [
        ...historial,
        {
          role: "user",
          content: `Configuración musical elegida:
- Estilo: ${configActual.estilo}
- Tono: ${configActual.tono}
- Voz: ${configActual.voz}
- Tempo: ${configActual.tempo}

Ahora genera la letra completa de la canción con toda la información anterior.`,
        },
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: mensajesConConfig, mode: "generate" }),
      });

      const data = await res.json();
      if (data.text) {
        setLetra(data.text);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setGenerando(false);
    }
  }

  function toggleExtra(key: keyof Extras) {
    setExtras((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function cambiarConfig(campo: keyof ConfigMusical, valor: string) {
    const nueva = { ...config, [campo]: valor };
    setConfig(nueva);
  }

  const precioBase = 39;
  const precioExtras = Object.entries(extras).reduce((acc, [key, val]) => {
    if (!val) return acc;
    const precios: Record<string, number> = { coro_doble: 5, bridge: 8, intro_piano: 10, final_dramatico: 7 };
    return acc + (precios[key] ?? 0);
  }, 0);
  const precioTotal = precioBase + precioExtras;

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ height: 3, background: "var(--ink-200)" }}>
        <div style={{ height: "100%", width: "90%", background: "var(--gradient-magic)", transition: "width 0.5s ease" }} />
      </div>

      <main style={{
        flex: 1, maxWidth: 780, width: "100%", margin: "0 auto",
        padding: "32px 20px 140px",
        animation: "fade-up 0.4s ease both",
      }}>
        {/* Encabezado */}
        <div style={{ marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 12px", borderRadius: "var(--radius-full)",
            background: "var(--success-100)",
            fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 12,
            color: "var(--success-600)", marginBottom: 12,
          }}>
            ✨ Propuesta lista
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(22px, 4vw, 32px)",
            color: "var(--text-strong)", lineHeight: 1.2, marginBottom: 8,
          }}>
            Tu canción está casi lista
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)" }}>
            Revisa la letra, ajusta el estilo y agrega extras si quieres algo más especial.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>

          {/* ── Letra ── */}
          <div style={{
            background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-subtle)", overflow: "hidden",
            boxShadow: "var(--shadow-card)",
          }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px",
              borderBottom: letraVisible ? "1px solid var(--border-subtle)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>🎵</span>
                <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 15, color: "var(--text-strong)" }}>
                  Letra generada
                </span>
              </div>
              {!generando && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => generarLetra()}
                    style={{
                      padding: "6px 14px", borderRadius: "var(--radius-full)",
                      border: "1.5px solid var(--border-subtle)",
                      background: "none", cursor: "pointer",
                      fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 12,
                      color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5,
                    }}
                  >
                    🔄 Regenerar
                  </button>
                  <button
                    onClick={() => setLetraVisible(!letraVisible)}
                    style={{
                      padding: "6px 14px", borderRadius: "var(--radius-full)",
                      border: "1.5px solid var(--border-subtle)",
                      background: "none", cursor: "pointer",
                      fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 12,
                      color: "var(--text-muted)",
                    }}
                  >
                    {letraVisible ? "Ocultar" : "Ver"}
                  </button>
                </div>
              )}
            </div>

            {letraVisible && (
              <div style={{ padding: "20px" }}>
                {generando ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "40px 0" }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%",
                      background: "var(--gradient-magic)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 24, boxShadow: "var(--shadow-magic)",
                      animation: "pop 0.6s ease infinite alternate",
                    }}>🎵</div>
                    <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--text-muted)", textAlign: "center" }}>
                      Componiendo tu canción con todo lo que me contaste...
                    </p>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[0, 1, 2].map((n) => (
                        <div key={n} style={{
                          width: 8, height: 8, borderRadius: "50%",
                          background: "var(--magenta-300)",
                          animation: `eq-bounce 0.8s ease ${n * 0.15}s infinite`,
                        }} />
                      ))}
                    </div>
                  </div>
                ) : error ? (
                  <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <p style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", marginBottom: 12 }}>
                      Hubo un error generando la letra. ¿Intentamos de nuevo?
                    </p>
                    <button
                      onClick={() => generarLetra()}
                      style={{
                        padding: "10px 24px", borderRadius: "var(--radius-full)",
                        background: "var(--gradient-magic)", color: "#fff",
                        fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14,
                        border: "none", cursor: "pointer",
                      }}
                    >
                      Reintentar
                    </button>
                  </div>
                ) : (
                  <pre style={{
                    fontFamily: "var(--font-body)", fontSize: 14,
                    color: "var(--text-body)", lineHeight: 1.9,
                    whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0,
                  }}>
                    {letra}
                  </pre>
                )}
              </div>
            )}
          </div>

          {/* ── Configuración musical ── */}
          <div style={{
            background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-subtle)", padding: "20px",
            boxShadow: "var(--shadow-card)",
          }}>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 15, color: "var(--text-strong)", marginBottom: 4 }}>
                🎸 Configuración musical
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)" }}>
                Confirma o ajusta — si cambias algo, regenera la letra para que se adapte.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Estilo */}
              <div>
                <p style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>Estilo musical</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {ESTILOS.map((e) => (
                    <Chip key={e} label={e} activo={config.estilo === e} onClick={() => cambiarConfig("estilo", e)} />
                  ))}
                </div>
              </div>

              {/* Tono + Voz + Tempo */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                <div>
                  <p style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>💫 Tono</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {TONOS.map((t) => <Chip key={t} label={t} activo={config.tono === t} onClick={() => cambiarConfig("tono", t)} />)}
                  </div>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>🎤 Voz</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {VOCES.map((v) => <Chip key={v} label={v} activo={config.voz === v} onClick={() => cambiarConfig("voz", v)} />)}
                  </div>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>⚡ Tempo</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {TEMPOS.map((t) => <Chip key={t} label={t} activo={config.tempo === t} onClick={() => cambiarConfig("tempo", t)} />)}
                  </div>
                </div>
              </div>

              {/* Botón regenerar con nueva config */}
              {!generando && letra && (
                <button
                  onClick={() => generarLetra(config)}
                  style={{
                    padding: "10px 0", borderRadius: "var(--radius-full)",
                    border: "1.5px dashed var(--magenta-300)",
                    background: "var(--magenta-050)", cursor: "pointer",
                    fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13,
                    color: "var(--magenta-700)", transition: "all 0.15s",
                  }}
                >
                  🔄 Regenerar con esta configuración
                </button>
              )}
            </div>
          </div>

          {/* ── Efectos especiales (add-ons de pago) ── */}
          <div style={{
            background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-subtle)", padding: "20px",
            boxShadow: "var(--shadow-card)",
          }}>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 15, color: "var(--text-strong)", marginBottom: 4 }}>
                ✨ Efectos especiales
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)" }}>
                Opcionales — cada uno tiene un costo adicional que se suma al precio base.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ExtraToggle emoji="🎶" titulo="Coro doble" desc="El coro se repite con armonías adicionales" activo={extras.coro_doble} precio={5} onClick={() => toggleExtra("coro_doble")} />
              <ExtraToggle emoji="🌉" titulo="Bridge emocional" desc="Sección intermedia que eleva la intensidad" activo={extras.bridge} precio={8} onClick={() => toggleExtra("bridge")} />
              <ExtraToggle emoji="🎹" titulo="Intro de piano" desc="Apertura instrumental con piano solo" activo={extras.intro_piano} precio={10} onClick={() => toggleExtra("intro_piano")} />
              <ExtraToggle emoji="🎆" titulo="Final dramático" desc="Cierre épico con crescendo orquestal" activo={extras.final_dramatico} precio={7} onClick={() => toggleExtra("final_dramatico")} />
            </div>
          </div>
        </div>
      </main>

      {/* ── Barra de acción fija ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(255,249,245,0.97)", backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "14px 20px 18px",
      }}>
        <div style={{
          maxWidth: 780, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--text-subtle)", marginBottom: 2 }}>
              {precioExtras > 0 ? `Base $${precioBase} + extras $${precioExtras}` : "Canción IA personalizada"}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "var(--text-strong)" }}>
                ${precioTotal}
              </span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--text-subtle)", textDecoration: "line-through" }}>
                $78
              </span>
            </div>
          </div>
          <button
            onClick={() => router.push("/pago")}
            disabled={generando}
            style={{
              height: 50, padding: "0 32px", borderRadius: "var(--radius-full)",
              background: generando ? "var(--ink-200)" : "var(--gradient-magic)", color: "#fff",
              fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 15,
              border: "none", cursor: generando ? "not-allowed" : "pointer",
              boxShadow: generando ? "none" : "var(--shadow-magic)",
              whiteSpace: "nowrap", transition: "all 0.2s",
            }}
          >
            {generando ? "Generando..." : "Pagar y crear 🎵"}
          </button>
        </div>
      </div>
    </div>
  );
}
