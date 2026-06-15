"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const OCCASIONS = [
  { id: "mama",   label: "Mamá",        emoji: "💖", title: "Para mi mamá",           sub: "Balada · emotiva",   grad: "linear-gradient(135deg,#FF6B4A,#FF1493)" },
  { id: "boda",   label: "Boda",        emoji: "💍", title: "Nuestro primer baile",   sub: "Pop romántico",      grad: "linear-gradient(135deg,#D4358F,#6B1F4A)" },
  { id: "aniv",   label: "Aniversario", emoji: "🥂", title: "50 años juntos",         sub: "Ranchera · alegre",  grad: "linear-gradient(135deg,#19C3C9,#0B8A8F)" },
  { id: "cumple", label: "Cumpleaños",  emoji: "🎂", title: "¡Felices 15!",           sub: "Cumbia · fiesta",    grad: "linear-gradient(135deg,#FFB347,#FF6B4A)" },
  { id: "bebe",   label: "Bebé",        emoji: "🍼", title: "Bienvenido al mundo",    sub: "Canción de cuna",    grad: "linear-gradient(135deg,#7B5BD6,#4A2D8F)" },
  { id: "homen",  label: "Homenaje",    emoji: "🕊️", title: "Siempre en mi corazón", sub: "Balada · memoria",   grad: "linear-gradient(135deg,#6B1F4A,#2D1B2E)" },
];

const STEPS = [
  { emoji: "🎤", n: "1", label: "Cuéntanos tu historia", body: "Con tu voz o por escrito, en 2 minutos." },
  { emoji: "✨", n: "2", label: "La IA crea tu canción", body: "Letra, música y voz, hechos solo para ti." },
  { emoji: "📲", n: "3", label: "Descarga y comparte",   body: "Lista en minutos. Un regalo para siempre." },
];

const TESTIMONIALS = [
  { name: "María Elena Ríos", song: "Canción para mamá",  quote: "Lloré cuando la escuché. Capturó exactamente lo que sentía y no sabía cómo decir." },
  { name: "Jorge Hernández",  song: "Canción de boda",    quote: "Sonó en nuestro primer baile. Nadie creía que la había creado yo desde mi teléfono." },
  { name: "Lupita Mendoza",   song: "Homenaje a papá",    quote: "La escuchamos toda la familia. Fue como tenerlo de nuevo con nosotros un momento." },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={14} height={14} viewBox="0 0 24 24" fill="var(--amarillo-600)" aria-hidden="true">
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.9 6.2 20.9l1.1-6.45-4.7-4.6 6.5-.95L12 2.5Z"/>
        </svg>
      ))}
    </div>
  );
}

export default function LandingPage() {
  const [selected, setSelected] = useState(OCCASIONS[0]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ background: "var(--gradient-magic)", padding: "40px 20px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none" }}>
          <svg width="100%" height="100%" viewBox="0 0 390 360" preserveAspectRatio="none">
            {[0,1,2,3].map(i => (
              <path key={i} d={`M0 ${180+i*36} Q97 ${140+i*36} 195 ${180+i*36} T390 ${180+i*36}`}
                fill="none" stroke="#fff" strokeWidth="2" />
            ))}
          </svg>
        </div>
        <div style={{ position: "relative", maxWidth: 540, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Stars />
            <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.92)" }}>
              4,847 canciones creadas
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(28px,6vw,42px)", lineHeight: 1.1,
            letterSpacing: "-0.02em", color: "#fff", marginBottom: 10,
          }}>
            Crea la canción que los hará llorar de alegría
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 24 }}>
            En 2 minutos. Desde tu teléfono. Empieza eligiendo para quién:
          </p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {OCCASIONS.map(o => (
              <button key={o.id} onClick={() => setSelected(o)} style={{
                padding: "8px 14px", borderRadius: "var(--radius-full)",
                border: selected.id === o.id ? "2px solid #fff" : "2px solid rgba(255,255,255,0.35)",
                background: selected.id === o.id ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)",
                color: "#fff", fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13,
                cursor: "pointer", transition: "all 0.2s ease",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                {o.emoji} {o.label}
              </button>
            ))}
          </div>

          <div style={{
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            borderRadius: "var(--radius-xl)", padding: "16px 20px", marginBottom: 24,
            border: "1px solid rgba(255,255,255,0.25)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "var(--radius-lg)",
                background: selected.grad, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 24, flexShrink: 0,
              }}>{selected.emoji}</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "#fff" }}>
                  {selected.title}
                </div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
                  {selected.sub}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            <span style={{
              background: "var(--amarillo-600)", color: "var(--ink-900)",
              fontFamily: "var(--font-ui)", fontWeight: 800, fontSize: 12,
              padding: "4px 10px", borderRadius: "var(--radius-full)",
            }}>50% OFF</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "#fff" }}>$39 MXN</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "line-through" }}>$78</span>
          </div>

          <Link href="/precios" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", height: 54, borderRadius: "var(--radius-full)",
            background: "#fff", color: "var(--brand-primary)",
            fontFamily: "var(--font-ui)", fontWeight: 800, fontSize: 16,
            textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}>
            Probar gratis ahora →
          </Link>

          <div style={{ display: "flex", gap: 24, marginTop: 18, flexWrap: "wrap" }}>
            {[["4,847", "canciones"], ["4.9★", "calificación"], ["98%", "felices"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "var(--font-ui)", fontWeight: 800, fontSize: 16, color: "#fff" }}>{n}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={{ padding: "52px 20px", maxWidth: 540, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span style={{
            fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 11,
            letterSpacing: "0.12em", color: "var(--brand-primary)", textTransform: "uppercase",
          }}>Así de fácil</span>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28,
            color: "var(--text-strong)", marginTop: 6, lineHeight: 1.2,
          }}>En 3 pasos tienes tu canción</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {STEPS.map(s => (
            <div key={s.n} style={{
              display: "flex", gap: 16, alignItems: "flex-start",
              background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
              padding: "20px", boxShadow: "var(--shadow-card)",
              border: "1px solid var(--border-subtle)",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "var(--radius-lg)", flexShrink: 0,
                background: "var(--surface-info)", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 22,
              }}>{s.emoji}</div>
              <div>
                <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 15, color: "var(--text-strong)", marginBottom: 4 }}>
                  {s.n}. {s.label}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {s.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section style={{ padding: "0 20px 52px", maxWidth: 540, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24,
          color: "var(--text-strong)", marginBottom: 20, textAlign: "center",
        }}>Lo que dicen nuestros usuarios</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} style={{
              background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
              padding: "20px", boxShadow: "var(--shadow-card)",
              border: "1px solid var(--border-subtle)",
            }}>
              <Stars />
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-body)",
                lineHeight: 1.6, margin: "10px 0 12px", fontStyle: "italic",
              }}>"{t.quote}"</p>
              <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13, color: "var(--text-strong)" }}>{t.name}</div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--brand-primary)", marginTop: 2 }}>{t.song}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "48px 20px 64px", background: "var(--gradient-night)", textAlign: "center" }}>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28,
          color: "#fff", marginBottom: 10, lineHeight: 1.2,
        }}>¿Para quién es tu próxima canción?</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(255,255,255,0.75)", marginBottom: 28 }}>
          Empieza ahora — lista en 2 minutos.
        </p>
        <Link href="/precios" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "16px 36px", borderRadius: "var(--radius-full)",
          background: "var(--gradient-magic)", color: "#fff",
          fontFamily: "var(--font-ui)", fontWeight: 800, fontSize: 16,
          textDecoration: "none", boxShadow: "var(--shadow-magic)",
        }}>
          Crear mi canción ✨
        </Link>
        <div style={{ marginTop: 16, fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
          www.micancion.app
        </div>
      </section>
    </div>
  );
}
