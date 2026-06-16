"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const METODOS = [
  {
    id: "escribir",
    emoji: "✍️",
    titulo: "Yo lo cuento",
    desc: "Escribe los detalles: para quién es, la ocasión, qué quieres decir. Nuestra IA lo convierte en una canción única.",
    detalle: ["Tú tienes el control total", "Ideal si ya sabes lo que quieres decir", "La IA escribe la letra por ti"],
    color: "var(--magenta-600)",
    gradiente: "var(--gradient-magic)",
    shadow: "var(--shadow-magic)",
    bg: "var(--magenta-050)",
    border: "var(--magenta-300)",
  },
  {
    id: "hablar",
    emoji: "🎙️",
    titulo: "La IA me guía",
    desc: "Nuestra IA te hace preguntas para conocer la historia. Tú solo respondes, ella crea la canción perfecta.",
    detalle: ["Conversación fácil y rápida", "Ideal si no sabes por dónde empezar", "Preguntas inteligentes que inspiran"],
    color: "var(--teal-600)",
    gradiente: "linear-gradient(135deg, #19C3C9 0%, #4DD9DE 100%)",
    shadow: "0 8px 32px rgba(25,195,201,0.25)",
    bg: "var(--teal-050)",
    border: "var(--teal-400)",
  },
];

export default function CrearPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
        padding: "48px 20px 80px",
        animation: "fade-up 0.4s ease both",
      }}>
        {/* Paso indicador */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8, marginBottom: 32,
          fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600,
          color: "var(--text-muted)",
        }}>
          <span style={{
            width: 24, height: 24, borderRadius: "50%",
            background: "var(--gradient-magic)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700,
          }}>1</span>
          <span>Elige cómo crear</span>
          <span style={{ color: "var(--ink-200)" }}>—</span>
          <span style={{ color: "var(--ink-300)" }}>2 Cuéntanos</span>
          <span style={{ color: "var(--ink-200)" }}>—</span>
          <span style={{ color: "var(--ink-300)" }}>3 Tu canción</span>
        </div>

        {/* Título */}
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px, 5vw, 40px)",
          color: "var(--text-strong)", textAlign: "center", marginBottom: 12, lineHeight: 1.2,
        }}>
          ¿Cómo quieres crear<br />
          <span style={{
            background: "var(--gradient-magic)", WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>tu canción?</span>
        </h1>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-muted)",
          textAlign: "center", marginBottom: 40, maxWidth: 460,
        }}>
          Elige el método que más se adapte a ti. Ambos generan una canción 100% personalizada.
        </p>

        {/* Cards de método */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20, width: "100%", maxWidth: 680, marginBottom: 40,
        }}>
          {METODOS.map((m) => (
            <button
              key={m.id}
              onClick={() => router.push(`/crear/chat?metodo=${m.id}`)}
              style={{
                all: "unset", cursor: "pointer",
                display: "flex", flexDirection: "column",
                padding: 28, borderRadius: "var(--radius-xl)",
                background: "var(--surface-card)",
                border: "2px solid var(--border-subtle)",
                boxShadow: "var(--shadow-card)",
                transition: "all 0.2s ease",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.border = `2px solid ${m.color}`;
                el.style.boxShadow = m.shadow;
                el.style.transform = "scale(1.02)";
                el.style.background = m.bg;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.border = "2px solid var(--border-subtle)";
                el.style.boxShadow = "var(--shadow-card)";
                el.style.transform = "scale(1)";
                el.style.background = "var(--surface-card)";
              }}
            >
              <span style={{ fontSize: 40, marginBottom: 16, display: "block" }}>{m.emoji}</span>

              <span style={{
                fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22,
                color: "var(--text-strong)", marginBottom: 10, display: "block",
              }}>{m.titulo}</span>

              <p style={{
                fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)",
                lineHeight: 1.6, marginBottom: 20,
              }}>{m.desc}</p>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {m.detalle.map((item) => (
                  <li key={item} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    fontFamily: "var(--font-ui)", fontSize: 13,
                    color: "var(--text-muted)", fontWeight: 500,
                  }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                      background: "var(--ink-200)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: "#fff", fontWeight: 700,
                    }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* Garantía */}
        <p style={{
          marginTop: 8, fontFamily: "var(--font-ui)", fontSize: 12,
          color: "var(--text-subtle)", textAlign: "center",
        }}>
          🔒 Sin registro requerido · Pago solo al finalizar · Garantía 100%
        </p>
      </main>
    </div>
  );
}
