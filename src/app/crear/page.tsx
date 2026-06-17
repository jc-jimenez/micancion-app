"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const METODOS = [
  {
    id: "hablar",
    emoji: "🎙️",
    titulo: "La IA me guía",
    desc: "Nuestra IA te hace preguntas inteligentes para conocer tu historia. Tú solo respondes.",
    detalle: ["Conversación fácil y rápida", "Ideal si no sabes por dónde empezar", "Preguntas que inspiran"],
    accent: "#D4358F",
    glow: "rgba(212,53,143,0.3)",
  },
  {
    id: "escribir",
    emoji: "✍️",
    titulo: "Yo lo cuento",
    desc: "Escribe los detalles: para quién es, la ocasión, qué quieres decir. La IA crea la letra.",
    detalle: ["Tú tienes el control total", "Ideal si ya sabes lo que quieres decir", "Resultado más directo"],
    accent: "#19C3C9",
    glow: "rgba(25,195,201,0.3)",
  },
];

export default function CrearPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: "#0D0A14", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@400;600;700&display=swap');`}</style>

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(13,10,20,0.85)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "0 24px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎵</div>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>MiCanción</span>
        </Link>
        <Link href="/dashboard" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Entrar</Link>
      </nav>

      {/* Blob fondo */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "20%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,53,143,0.12) 0%,transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(25,195,201,0.1) 0%,transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <main style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 24px 80px" }}>

        {/* Steps indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 48 }}>
          {[["1","Elige método"],["2","Cuéntanos"],["3","Tu canción"]].map(([n, label], i) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.15)" }} />}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", fontSize: 11, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: i === 0 ? "linear-gradient(135deg,#D4358F,#FF6B4A)" : "rgba(255,255,255,0.1)",
                  color: i === 0 ? "#fff" : "rgba(255,255,255,0.35)",
                }}>{n}</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: i === 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)" }}>{label}</span>
              </div>
            </div>
          ))}
        </div>

        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(28px,5vw,42px)", color: "#fff", textAlign: "center", marginBottom: 12, lineHeight: 1.2 }}>
          ¿Cómo quieres crear{" "}
          <span style={{ background: "linear-gradient(135deg,#D4358F,#FF6B4A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>tu canción?</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, textAlign: "center", marginBottom: 48, maxWidth: 460 }}>
          Ambos métodos generan una canción 100% personalizada. Elige el que más te guste.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, width: "100%", maxWidth: 680 }}>
          {METODOS.map((m) => (
            <button
              key={m.id}
              onClick={() => router.push(`/crear/chat?metodo=${m.id}`)}
              style={{
                all: "unset", cursor: "pointer",
                display: "flex", flexDirection: "column", padding: 32,
                borderRadius: 20,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "all 0.2s ease", textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${m.accent}`;
                e.currentTarget.style.boxShadow = `0 8px 32px ${m.glow}`;
                e.currentTarget.style.background = `rgba(255,255,255,0.06)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <div style={{ width: 56, height: 56, borderRadius: 14, background: `${m.accent}22`, border: `1px solid ${m.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>{m.emoji}</div>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 10, display: "block" }}>{m.titulo}</span>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{m.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {m.detalle.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                    <span style={{ color: m.accent, fontWeight: 700 }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        <p style={{ marginTop: 36, color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
          🔒 Sin registro · Pago solo al finalizar · Garantía 100%
        </p>
      </main>
    </div>
  );
}
