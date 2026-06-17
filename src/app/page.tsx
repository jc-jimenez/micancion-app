"use client";
import { useState } from "react";
import Link from "next/link";

// ── Datos ──────────────────────────────────────────────────────────────────────

const OCCASIONS = [
  { label: "Para Mamá",    emoji: "💖" },
  { label: "Boda",         emoji: "💍" },
  { label: "Aniversario",  emoji: "❤️" },
  { label: "Cumpleaños",   emoji: "🎂" },
  { label: "Bebé",         emoji: "🍼" },
  { label: "Homenaje",     emoji: "⭐" },
];

const STEPS = [
  { n: "01", icon: "🎙️", label: "Cuéntanos tu historia", body: "Comparte los momentos especiales, nombres y detalles únicos. Puedes escribirlos o dictarlos por voz." },
  { n: "02", icon: "✨", label: "La IA compone tu canción", body: "Nuestra IA crea una letra personalizada con tu estilo musical favorito: mariachi, banda, pop y más." },
  { n: "03", icon: "🎵", label: "Recibe y comparte", body: "En minutos recibes tu canción lista para descargar, compartir y sorprender a quien más quieres." },
];

const TESTIMONIALS = [
  { name: "Valeria Morales", location: "Guadalajara, México", occasion: "Día de las Madres", initials: "VM", color: "#D4358F", quote: "Le hice una canción a mi mamá para el Día de las Madres y lloró de emoción. Nunca pensé que algo tan personalizado pudiera existir. ¡Mil gracias!" },
  { name: "Diego Hernández", location: "Ciudad de México",   occasion: "Boda",              initials: "DH", color: "#19C3C9", quote: "La usé para la boda de mi hermana. Todos en la fiesta preguntaban quién había compuesto esa canción tan especial. Fue el regalo perfecto." },
  { name: "Sofía Ramírez",   location: "Monterrey, México",  occasion: "Cumpleaños",        initials: "SR", color: "#FF6B4A", quote: "Mi esposo cumplió 30 años y le hice una canción con todos los momentos que vivimos. Se puso a llorar enfrente de toda la familia. ¡Increíble!" },
];

const PLANS = [
  {
    name: "Canción IA",
    price: "$39",
    original: "$78",
    desc: "Voz profesional generada por IA",
    features: ["Letra 100% personalizada", "Estilo musical a elegir", "Entrega en minutos", "Descarga MP3"],
    popular: false,
    href: "/crear",
  },
  {
    name: "Con Tu Voz",
    price: "$74",
    original: "$148",
    desc: "Grabada con tu propia voz",
    features: ["Todo lo del plan básico", "Tu voz como protagonista", "Guía paso a paso", "2 revisiones incluidas"],
    popular: true,
    href: "/crear",
  },
  {
    name: "Premium",
    price: "$124",
    original: null,
    desc: "30 días de canciones ilimitadas",
    features: ["Canciones ilimitadas", "Todos los estilos", "Prioridad en soporte", "Biblioteca personal"],
    popular: false,
    href: "/crear",
  },
];

// ── Componentes ────────────────────────────────────────────────────────────────

function Stars({ color = "#FFB800" }: { color?: string }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={16} height={16} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.9 6.2 20.9l1.1-6.45-4.7-4.6 6.5-.95L12 2.5Z"/>
        </svg>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [activeOccasion, setActiveOccasion] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#0D0A14", fontFamily: "'Nunito', sans-serif" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(13,10,20,0.85)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "0 24px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg,#D4358F,#FF6B4A)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
          }}>🎵</div>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>
            MiCanción
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <a href="#como-funciona" style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>¿Cómo funciona?</a>
          <a href="#precios" style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Precios</a>
          <Link href="/dashboard" style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Entrar</Link>
          <Link href="/crear" style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "9px 20px", borderRadius: 100,
            background: "linear-gradient(135deg,#D4358F,#FF6B4A)",
            color: "#fff", fontWeight: 700, fontSize: 14,
            textDecoration: "none", boxShadow: "0 4px 16px rgba(212,53,143,0.4)",
          }}>
            Crear ✦
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "100px 24px 80px", textAlign: "center" }}>
        {/* Blobs de fondo */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -100, left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,53,143,0.25) 0%,transparent 70%)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", top: 0, right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(25,195,201,0.18) 0%,transparent 70%)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: -50, left: "30%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,74,0.15) 0%,transparent 70%)", filter: "blur(40px)" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 780, margin: "0 auto" }}>
          {/* Badge social proof */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 100,
            border: "1px solid rgba(212,53,143,0.4)",
            background: "rgba(212,53,143,0.08)",
            marginBottom: 32,
          }}>
            <span style={{ fontSize: 14 }}>🎵</span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600 }}>+2,000 canciones creadas este mes</span>
          </div>

          {/* Título */}
          <h1 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(36px, 6vw, 64px)",
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}>
            Regala una canción{" "}
            <span style={{ background: "linear-gradient(135deg,#D4358F,#FF6B4A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>que</span>
            <br />
            <span style={{ background: "linear-gradient(135deg,#FFB347,#FF6B4A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>nunca olvidarán</span>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 18, lineHeight: 1.6, maxWidth: 560, margin: "0 auto 40px" }}>
            Crea una canción 100% personalizada con inteligencia artificial. Cuéntanos tu historia y en minutos tendrás una pieza única para ese momento especial.
          </p>

          {/* Pills de ocasión */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 44 }}>
            {OCCASIONS.map((o, i) => (
              <button
                key={o.label}
                onClick={() => setActiveOccasion(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "9px 18px", borderRadius: 100,
                  border: `1px solid ${activeOccasion === i ? "rgba(212,53,143,0.8)" : "rgba(255,255,255,0.15)"}`,
                  background: activeOccasion === i ? "rgba(212,53,143,0.15)" : "rgba(255,255,255,0.05)",
                  color: activeOccasion === i ? "#fff" : "rgba(255,255,255,0.65)",
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {o.emoji} {o.label}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            <Link href="/crear" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 28px", borderRadius: 100,
              background: "linear-gradient(135deg,#D4358F,#FF6B4A)",
              color: "#fff", fontWeight: 700, fontSize: 16,
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(212,53,143,0.45)",
            }}>
              ✦ Crear mi canción
              <span style={{
                background: "rgba(255,255,255,0.25)", borderRadius: 100,
                padding: "2px 8px", fontSize: 11, fontWeight: 800,
              }}>50% OFF</span>
            </Link>

            <button style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 28px", borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer",
            }}>
              ▶ Escuchar ejemplo
            </button>
          </div>

          {/* Social proof */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
            <div style={{ display: "flex" }}>
              {["VM","GH","LR","SR","MK"].map((initials, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: ["#D4358F","#19C3C9","#FF6B4A","#7B5BD6","#FFB347"][i],
                  border: "2px solid #0D0A14",
                  marginLeft: i === 0 ? 0 : -8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: "#fff",
                }}>{initials}</div>
              ))}
            </div>
            <Stars color="#FFB800" />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600 }}>
              4.9 · 2,400+ canciones
            </span>
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section id="como-funciona" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-block", padding: "4px 14px", borderRadius: 100,
              border: "1px solid rgba(212,53,143,0.5)",
              color: "#D4358F", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
              marginBottom: 16, textTransform: "uppercase",
            }}>¿Cómo funciona?</div>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800, fontSize: "clamp(28px,4vw,42px)",
              color: "#fff", lineHeight: 1.2,
            }}>Tu canción en 3 pasos simples</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {STEPS.map((s) => (
              <div key={s.n} style={{
                position: "relative", overflow: "hidden",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20, padding: "32px 28px",
              }}>
                {/* Número gigante de fondo */}
                <div style={{
                  position: "absolute", top: -10, right: 16,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800, fontSize: 100, lineHeight: 1,
                  color: "rgba(255,255,255,0.04)", userSelect: "none",
                }}>{s.n}</div>

                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: "rgba(212,53,143,0.12)",
                  border: "1px solid rgba(212,53,143,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, marginBottom: 20,
                }}>{s.icon}</div>

                <h3 style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 10,
                }}>{s.label}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-block", padding: "4px 14px", borderRadius: 100,
              border: "1px solid rgba(255,107,74,0.5)",
              color: "#FF6B4A", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
              marginBottom: 16, textTransform: "uppercase",
            }}>Testimonios reales</div>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800, fontSize: "clamp(28px,4vw,42px)",
              color: "#fff", lineHeight: 1.2,
            }}>Momentos que emocionan de verdad</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20, padding: "28px",
              }}>
                <Stars color="#FFB800" />
                <p style={{
                  color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.8,
                  margin: "16px 0 24px", fontStyle: "italic",
                }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: t.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
                  }}>{t.initials}</div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 2 }}>
                      {t.location} · {t.occasion}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="precios" style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-block", padding: "4px 14px", borderRadius: 100,
              border: "1px solid rgba(25,195,201,0.5)",
              color: "#19C3C9", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
              marginBottom: 16, textTransform: "uppercase",
            }}>Precios</div>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800, fontSize: "clamp(28px,4vw,42px)",
              color: "#fff", lineHeight: 1.2, marginBottom: 12,
            }}>Elige tu plan ideal</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}>Sin suscripciones forzadas. Paga solo lo que necesitas.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {PLANS.map((p) => (
              <div key={p.name} style={{
                position: "relative",
                background: p.popular ? "rgba(25,195,201,0.06)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${p.popular ? "rgba(25,195,201,0.4)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 20, padding: "32px 28px",
              }}>
                {p.popular && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "4px 14px", borderRadius: 100,
                    background: "linear-gradient(135deg,#19C3C9,#0B8A8F)",
                    color: "#fff", fontSize: 12, fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}>✦ Más popular</div>
                )}

                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{p.name}</div>

                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                  <span style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800, fontSize: 42, color: "#fff",
                  }}>{p.price}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>MXN</span>
                  {p.original && (
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, textDecoration: "line-through" }}>{p.original}</span>
                  )}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 28 }}>{p.desc}</div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: "#19C3C9", fontSize: 14, fontWeight: 700 }}>✓</span>
                      <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <Link href={p.href} style={{
                  display: "block", textAlign: "center",
                  padding: "13px 0", borderRadius: 100,
                  background: p.popular ? "linear-gradient(135deg,#19C3C9,#0B8A8F)" : "rgba(255,255,255,0.08)",
                  border: p.popular ? "none" : "1px solid rgba(255,255,255,0.15)",
                  color: "#fff", fontWeight: 700, fontSize: 15,
                  textDecoration: "none",
                  boxShadow: p.popular ? "0 8px 24px rgba(25,195,201,0.3)" : "none",
                  transition: "all 0.2s",
                }}>
                  Elegir este plan →
                </Link>
              </div>
            ))}
          </div>

          {/* Sellos */}
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 40, flexWrap: "wrap" }}>
            {["✅ Garantía de satisfacción", "🔒 Pago seguro con Mercado Pago", "⚡ Entrega en minutos"].map(s => (
              <span key={s} style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{
        padding: "80px 24px 100px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(212,53,143,0.2) 0%,transparent 70%)",
          filter: "blur(30px)", pointerEvents: "none",
        }} />
        <div style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800, fontSize: "clamp(28px,4vw,42px)",
            color: "#fff", lineHeight: 1.2, marginBottom: 16,
          }}>¿Para quién es tu próxima canción?</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, marginBottom: 40 }}>
            Empieza ahora — lista en minutos.
          </p>
          <Link href="/crear" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "18px 40px", borderRadius: 100,
            background: "linear-gradient(135deg,#D4358F,#FF6B4A)",
            color: "#fff", fontWeight: 800, fontSize: 17,
            textDecoration: "none",
            boxShadow: "0 8px 40px rgba(212,53,143,0.5)",
          }}>
            ✦ Crear mi canción gratis
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "32px 24px",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 8,
      }}>
        <span style={{ fontSize: 16 }}>🎵</span>
        <span style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 700, fontSize: 14, color: "rgba(255,255,255,0.35)",
        }}>MiCancion.app</span>
      </footer>

    </div>
  );
}
