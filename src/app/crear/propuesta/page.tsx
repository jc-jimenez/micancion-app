"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Extras = { coro_doble: boolean; bridge: boolean; intro_piano: boolean; final_dramatico: boolean };
type ConfigMusical = { estilo: string; tono: string; voz: string; tempo: string };

const ESTILOS = ["Mariachi", "Corrido", "Banda", "Norteño", "Balada", "Pop", "Cumbia", "Urbano", "Góspel", "IA decide"];
const TONOS = ["Emotivo", "Alegre", "Con humor", "Poético", "Intenso"];
const VOCES = ["Femenina", "Masculina", "Dueto"];
const TEMPOS = ["Lento", "Moderado", "Rápido"];

function Chip({ label, activo, onClick, color = "#D4358F" }: { label: string; activo: boolean; onClick: () => void; color?: string }) {
  return (
    <button onClick={onClick} style={{
      padding: "7px 16px", borderRadius: 100,
      border: `1.5px solid ${activo ? color : "rgba(255,255,255,0.12)"}`,
      background: activo ? `${color}22` : "rgba(255,255,255,0.04)",
      color: activo ? "#fff" : "rgba(255,255,255,0.5)",
      fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13,
      cursor: "pointer", transition: "all 0.15s ease",
      boxShadow: activo ? `0 4px 16px ${color}44` : "none",
    }}>{label}</button>
  );
}

function ExtraToggle({ emoji, titulo, desc, activo, precio, onClick }: {
  emoji: string; titulo: string; desc: string; activo: boolean; precio: number; onClick: () => void;
}) {
  return (
    <button onClick={onClick} style={{
      all: "unset", cursor: "pointer",
      display: "flex", alignItems: "center", gap: 14,
      padding: "14px 16px", borderRadius: 16,
      border: `1.5px solid ${activo ? "#19C3C9" : "rgba(255,255,255,0.08)"}`,
      background: activo ? "rgba(25,195,201,0.08)" : "rgba(255,255,255,0.03)",
      transition: "all 0.2s ease", width: "100%",
    }}>
      <span style={{ fontSize: 24, flexShrink: 0 }}>{emoji}</span>
      <div style={{ flex: 1, textAlign: "left" }}>
        <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: activo ? "#19C3C9" : "#fff" }}>{titulo}</div>
        <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{desc}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
        <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, color: activo ? "#19C3C9" : "rgba(255,255,255,0.4)" }}>+${precio}</span>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: activo ? "#19C3C9" : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700, transition: "background 0.2s" }}>
          {activo ? "✓" : "+"}
        </div>
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
  const [config, setConfig] = useState<ConfigMusical>({ estilo: "IA decide", tono: "Emotivo", voz: "Femenina", tempo: "Moderado" });
  const [extras, setExtras] = useState<Extras>({ coro_doble: false, bridge: false, intro_piano: false, final_dramatico: false });

  useEffect(() => { generarLetra(); }, []);

  async function generarLetra(configOverride?: ConfigMusical) {
    setGenerando(true); setError(false);
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("micancion_info") : null;
      const info = raw ? JSON.parse(raw) : null;
      const historial = info?.historial ?? [];
      const configActual = configOverride ?? config;
      const mensajesConConfig = [
        ...historial,
        { role: "user", content: `Configuración musical:\n- Estilo: ${configActual.estilo}\n- Tono: ${configActual.tono}\n- Voz: ${configActual.voz}\n- Tempo: ${configActual.tempo}\n\nAhora genera la letra completa.` },
      ];
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: mensajesConConfig, mode: "generate" }) });
      const data = await res.json();
      if (data.text) {
        setLetra(data.text);
        localStorage.setItem("micancion_letra", data.text);
      } else { setError(true); }
    } catch { setError(true); }
    finally { setGenerando(false); }
  }

  function toggleExtra(key: keyof Extras) { setExtras((p) => ({ ...p, [key]: !p[key] })); }
  function cambiarConfig(campo: keyof ConfigMusical, valor: string) { setConfig((p) => ({ ...p, [campo]: valor })); }

  const precioBase = 39;
  const precioExtras = Object.entries(extras).reduce((acc, [k, v]) => {
    if (!v) return acc;
    return acc + ({ coro_doble: 5, bridge: 8, intro_piano: 10, final_dramatico: 7 }[k] ?? 0);
  }, 0);
  const precioTotal = precioBase + precioExtras;

  return (
    <div style={{ minHeight: "100vh", background: "#0D0A14", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@400;600;700&display=swap');
        @keyframes eq-bounce{0%,100%{transform:scaleY(0.4)}50%{transform:scaleY(1)}}
        @keyframes fade-up{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes pop{from{transform:scale(0.85);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* Blobs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "5%", left: "10%", width: 500, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,53,143,0.1) 0%,transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(25,195,201,0.08) 0%,transparent 70%)", filter: "blur(60px)" }} />
      </div>

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(13,10,20,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎵</div>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>MiCanción</span>
        </Link>
        {/* Barra de progreso */}
        <div style={{ height: 4, width: 160, borderRadius: 100, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: "90%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", borderRadius: 100 }} />
        </div>
      </nav>

      <main style={{ position: "relative", zIndex: 1, maxWidth: 780, width: "100%", margin: "0 auto", padding: "40px 24px 160px", animation: "fade-up 0.4s ease both" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 100, background: "rgba(25,195,201,0.1)", border: "1px solid rgba(25,195,201,0.3)", marginBottom: 12 }}>
            <span style={{ color: "#19C3C9", fontSize: 12, fontWeight: 700 }}>✨ Propuesta lista</span>
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(24px,4vw,34px)", color: "#fff", lineHeight: 1.2, marginBottom: 8 }}>
            Tu canción está casi lista
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>Revisa la letra, ajusta el estilo y agrega extras si quieres algo más especial.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* ── Letra ── */}
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: letraVisible ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>🎵</span>
                <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>Letra generada</span>
              </div>
              {!generando && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => generarLetra()} style={{ padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.12)", background: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
                    🔄 Regenerar
                  </button>
                  <button onClick={() => setLetraVisible(!letraVisible)} style={{ padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.12)", background: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700 }}>
                    {letraVisible ? "Ocultar" : "Ver"}
                  </button>
                </div>
              )}
            </div>

            {letraVisible && (
              <div style={{ padding: "20px" }}>
                {generando ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "40px 0" }}>
                    <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: "0 8px 32px rgba(212,53,143,0.4)", animation: "pop 0.6s ease infinite alternate" }}>🎵</div>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, textAlign: "center" }}>Componiendo tu canción con todo lo que me contaste...</p>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[0,1,2].map(n => <div key={n} style={{ width: 8, height: 8, borderRadius: "50%", background: "#D4358F", animation: `eq-bounce 0.8s ease ${n*0.15}s infinite` }} />)}
                    </div>
                  </div>
                ) : error ? (
                  <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Hubo un error generando la letra.</p>
                    <button onClick={() => generarLetra()} style={{ padding: "10px 24px", borderRadius: 100, background: "linear-gradient(135deg,#D4358F,#FF6B4A)", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>
                      Reintentar
                    </button>
                  </div>
                ) : (
                  <pre style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 2, whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>
                    {letra}
                  </pre>
                )}
              </div>
            )}
          </div>

          {/* ── Configuración musical ── */}
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", padding: "20px" }}>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 4 }}>🎸 Configuración musical</h3>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginBottom: 20 }}>Si cambias algo, regenera la letra para que se adapte.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Estilo musical</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {ESTILOS.map(e => <Chip key={e} label={e} activo={config.estilo === e} onClick={() => cambiarConfig("estilo", e)} />)}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
                {[
                  { label: "💫 Tono", campo: "tono" as keyof ConfigMusical, opts: TONOS },
                  { label: "🎤 Voz", campo: "voz" as keyof ConfigMusical, opts: VOCES },
                  { label: "⚡ Tempo", campo: "tempo" as keyof ConfigMusical, opts: TEMPOS },
                ].map(({ label, campo, opts }) => (
                  <div key={campo}>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {opts.map(o => <Chip key={o} label={o} activo={config[campo] === o} onClick={() => cambiarConfig(campo, o)} color="#19C3C9" />)}
                    </div>
                  </div>
                ))}
              </div>

              {!generando && letra && (
                <button onClick={() => generarLetra(config)} style={{ padding: "10px 0", borderRadius: 100, border: "1.5px dashed rgba(212,53,143,0.4)", background: "rgba(212,53,143,0.06)", cursor: "pointer", fontWeight: 700, fontSize: 13, color: "#D4358F", transition: "all 0.15s" }}>
                  🔄 Regenerar con esta configuración
                </button>
              )}
            </div>
          </div>

          {/* ── Extras ── */}
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", padding: "20px" }}>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 4 }}>✨ Efectos especiales</h3>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginBottom: 16 }}>Opcionales — se suman al precio base.</p>
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
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, background: "rgba(13,10,20,0.95)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "14px 24px 20px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginBottom: 4 }}>
              {precioExtras > 0 ? `Base $${precioBase} + extras $${precioExtras}` : "Canción IA personalizada"}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 32, color: "#fff" }}>${precioTotal}</span>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, textDecoration: "line-through" }}>$78</span>
              <span style={{ background: "rgba(212,53,143,0.2)", color: "#D4358F", fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 100 }}>50% OFF</span>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.setItem("micancion_pedido", JSON.stringify({ total: precioTotal, desc: `${config.estilo} · ${config.tono} · Voz ${config.voz}`, estilo: config.estilo, tono: config.tono, voz: config.voz }));
              router.push("/pago");
            }}
            disabled={generando}
            style={{ height: 52, padding: "0 36px", borderRadius: 100, background: generando ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg,#D4358F,#FF6B4A)", color: generando ? "rgba(255,255,255,0.3)" : "#fff", fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 16, border: "none", cursor: generando ? "not-allowed" : "pointer", boxShadow: generando ? "none" : "0 8px 32px rgba(212,53,143,0.4)", whiteSpace: "nowrap", transition: "all 0.2s" }}
          >
            {generando ? "Generando..." : "Pagar y crear 🎵"}
          </button>
        </div>
      </div>
    </div>
  );
}
