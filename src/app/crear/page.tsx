"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MOTIVOS = [
  { id: "Amor y Pareja",        emoji: "❤️" },
  { id: "Familia",              emoji: "👨‍👩‍👧" },
  { id: "Cumpleaños",           emoji: "🎂" },
  { id: "Celebración",          emoji: "🎉" },
  { id: "Homenaje / Despedida", emoji: "⭐" },
  { id: "Fe y Espiritualidad",  emoji: "🙏" },
  { id: "Corrido Personalizado",emoji: "🤠" },
  { id: "Migrante y Nostalgia", emoji: "🌎" },
  { id: "Negocio o Empresa",    emoji: "🏢" },
  { id: "Divertida o Broma",    emoji: "😄" },
];

export default function CrearPage() {
  const router = useRouter();
  const [motivoSeleccionado, setMotivoSeleccionado] = useState<string | null>(null);

  function continuar(metodo: string) {
    if (!motivoSeleccionado) return;
    router.push(`/crear/chat?metodo=${metodo}&motivo=${encodeURIComponent(motivoSeleccionado)}`);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0D0A14", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@400;600;700&display=swap');
        @keyframes fade-up { from{transform:translateY(12px);opacity:0} to{transform:translateY(0);opacity:1} }
      `}</style>

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(13,10,20,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎵</div>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>MiCanción</span>
        </Link>
        <Link href="/dashboard" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Entrar</Link>
      </nav>

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "20%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,53,143,0.12) 0%,transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(25,195,201,0.1) 0%,transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <main style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 24px 100px", animation: "fade-up 0.4s ease both" }}>

        {/* PASO 1: Motivo */}
        <div style={{ width: "100%", maxWidth: 680, marginBottom: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 14px", borderRadius: 100, background: "rgba(212,53,143,0.12)", border: "1px solid rgba(212,53,143,0.3)", marginBottom: 14 }}>
              <span style={{ color: "#D4358F", fontSize: 12, fontWeight: 700 }}>PASO 1 de 2</span>
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(24px,4vw,36px)", color: "#fff", marginBottom: 8, lineHeight: 1.2 }}>
              ¿Cuál es el motivo de tu canción?
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>Elige la ocasión perfecta para tu canción personalizada.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
            {MOTIVOS.map((m) => {
              const activo = motivoSeleccionado === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMotivoSeleccionado(m.id)}
                  style={{
                    all: "unset", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    gap: 8, padding: "18px 12px", borderRadius: 16, textAlign: "center",
                    background: activo ? "rgba(212,53,143,0.15)" : "rgba(255,255,255,0.04)",
                    border: activo ? "1.5px solid #D4358F" : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: activo ? "0 4px 20px rgba(212,53,143,0.3)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ fontSize: 28 }}>{m.emoji}</span>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 12, color: activo ? "#fff" : "rgba(255,255,255,0.6)", lineHeight: 1.3 }}>{m.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PASO 2: Método (solo visible si hay motivo) */}
        {motivoSeleccionado && (
          <div style={{ width: "100%", maxWidth: 680, animation: "fade-up 0.3s ease both" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 14px", borderRadius: 100, background: "rgba(25,195,201,0.12)", border: "1px solid rgba(25,195,201,0.3)", marginBottom: 14 }}>
                <span style={{ color: "#19C3C9", fontSize: 12, fontWeight: 700 }}>PASO 2 de 2</span>
              </div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(20px,3vw,28px)", color: "#fff", marginBottom: 8 }}>
                ¿Cómo quieres contarnos la historia?
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              {[
                { id: "hablar", emoji: "🎙️", titulo: "La IA me guía", desc: "Nuestra IA te hace preguntas para conocer tu historia. Tú solo respondes.", accent: "#D4358F", glow: "rgba(212,53,143,0.3)" },
                { id: "escribir", emoji: "✍️", titulo: "Yo lo cuento", desc: "Escribe los detalles directamente. Ideal si ya sabes lo que quieres decir.", accent: "#19C3C9", glow: "rgba(25,195,201,0.3)" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => continuar(m.id)}
                  style={{ all: "unset", cursor: "pointer", display: "flex", flexDirection: "column", padding: 28, borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.2s ease", textAlign: "left" }}
                  onMouseEnter={(e) => { e.currentTarget.style.border = `1px solid ${m.accent}`; e.currentTarget.style.boxShadow = `0 8px 32px ${m.glow}`; e.currentTarget.style.background = `rgba(255,255,255,0.06)`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${m.accent}22`, border: `1px solid ${m.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>{m.emoji}</div>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 8, display: "block" }}>{m.titulo}</span>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6 }}>{m.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <p style={{ marginTop: 40, color: "rgba(255,255,255,0.25)", fontSize: 12 }}>
          🔒 Sin registro · Pago solo al finalizar · Garantía 100%
        </p>
      </main>
    </div>
  );
}
