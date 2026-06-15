"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const PLANS = [
  {
    id: "ia",
    name: "Canción IA",
    price: 39,
    original: 78,
    badge: "50% OFF",
    badgeColor: "var(--amarillo-600)",
    badgeText: "var(--ink-900)",
    desc: "Una canción única creada con IA: letra, música y voz artificial personalizada.",
    features: ["Letra personalizada con IA", "Música generada", "Voz IA (femenina o masculina)", "Descarga MP3", "Lista en ~3 min"],
    cta: "Seleccionar",
    highlight: false,
    tag: "Canción IA",
  },
  {
    id: "voz",
    name: "Con Tu Voz",
    price: 74,
    original: 148,
    badge: "50% OFF",
    badgeColor: "var(--magenta-600)",
    badgeText: "#fff",
    desc: "La canción lleva tu propia voz grabada integrada en la mezcla final.",
    features: ["Todo lo de Canción IA", "Tu voz en la mezcla", "Mezcla profesional", "Descarga MP3 + WAV", "Más emotiva y personal"],
    cta: "Seleccionar",
    highlight: true,
    tag: "Con Tu Voz",
  },
  {
    id: "premium",
    name: "Premium",
    price: 124,
    original: null,
    badge: "Ilimitado",
    badgeColor: "var(--teal-600)",
    badgeText: "#fff",
    desc: "Acceso ilimitado por 30 días. Crea todas las canciones que quieras.",
    features: ["Canciones ilimitadas 30 días", "IA + Con Tu Voz incluidos", "Prioridad en generación", "Soporte premium", "Créditos para efectos"],
    cta: "Seleccionar",
    highlight: false,
    tag: "Premium",
  },
];

const BUNDLES = [
  {
    id: "3pack",
    name: "Pack 3 canciones",
    price: 199,
    desc: "2 Canción IA + 1 Con Tu Voz",
    saving: "Ahorras $38",
    emoji: "🎵",
  },
  {
    id: "5pack",
    name: "Pack 5 canciones",
    price: 299,
    desc: "3 Canción IA + 2 Con Tu Voz",
    saving: "Ahorras $96",
    emoji: "🎶",
  },
];

export default function PreciosPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)" }}>
      <Navbar />

      {/* Banner oferta */}
      <div style={{
        background: "var(--gradient-magic)", padding: "10px 20px", textAlign: "center",
      }}>
        <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13, color: "#fff" }}>
          🎉 Primera canción con 50% OFF · Solo por tiempo limitado
        </span>
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 20px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32,
            color: "var(--text-strong)", lineHeight: 1.15, marginBottom: 10,
          }}>Elige tu plan</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)" }}>
            Transparente y sin sorpresas. Cancela cuando quieras.
          </p>
        </div>

        {/* Planes individuales */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
          {PLANS.map(plan => (
            <div key={plan.id} style={{
              background: plan.highlight ? "var(--gradient-night)" : "var(--surface-card)",
              borderRadius: "var(--radius-xl)", padding: "24px",
              border: plan.highlight ? "none" : "1px solid var(--border-subtle)",
              boxShadow: plan.highlight ? "var(--shadow-magic)" : "var(--shadow-card)",
              position: "relative",
            }}>
              {plan.highlight && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "var(--gradient-magic)", color: "#fff",
                  fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 11,
                  padding: "4px 14px", borderRadius: "var(--radius-full)",
                  whiteSpace: "nowrap",
                }}>⭐ Más elegido</div>
              )}

              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: "var(--font-ui)", fontWeight: 800, fontSize: 17,
                      color: plan.highlight ? "#fff" : "var(--text-strong)" }}>{plan.name}</span>
                    <span style={{
                      background: plan.badgeColor, color: plan.badgeText,
                      fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 10,
                      padding: "3px 8px", borderRadius: "var(--radius-full)",
                    }}>{plan.badge}</span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: 13,
                    color: plan.highlight ? "rgba(255,255,255,0.75)" : "var(--text-muted)",
                    lineHeight: 1.4,
                  }}>{plan.desc}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{
                    fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26,
                    color: plan.highlight ? "#fff" : "var(--text-strong)",
                  }}>${plan.price} <span style={{ fontSize: 13, fontWeight: 400 }}>MXN</span></div>
                  {plan.original && (
                    <div style={{
                      fontFamily: "var(--font-ui)", fontSize: 12,
                      color: plan.highlight ? "rgba(255,255,255,0.5)" : "var(--text-subtle)",
                      textDecoration: "line-through",
                    }}>${plan.original}</div>
                  )}
                </div>
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
                {plan.features.map(f => (
                  <li key={f} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    fontFamily: "var(--font-body)", fontSize: 13,
                    color: plan.highlight ? "rgba(255,255,255,0.85)" : "var(--text-body)",
                  }}>
                    <span style={{ color: plan.highlight ? "var(--amarillo-400)" : "var(--success-600)", fontSize: 14 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/crear" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                height: 48, borderRadius: "var(--radius-full)", textDecoration: "none",
                fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 15,
                background: plan.highlight ? "var(--gradient-magic)" : "var(--surface-info)",
                color: plan.highlight ? "#fff" : "var(--brand-primary)",
                boxShadow: plan.highlight ? "var(--shadow-magic)" : "none",
              }}>
                {plan.cta} →
              </Link>
            </div>
          ))}
        </div>

        {/* Paquetes */}
        <div style={{ marginBottom: 8 }}>
          <div style={{
            fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 11,
            letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase",
            textAlign: "center", marginBottom: 14,
          }}>Paquetes con descuento</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {BUNDLES.map(b => (
              <div key={b.id} style={{
                background: "var(--surface-premium)", borderRadius: "var(--radius-xl)",
                padding: "18px 20px", border: "1px solid var(--amarillo-400)",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{b.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 15, color: "var(--text-strong)", marginBottom: 2 }}>
                    {b.name}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)" }}>{b.desc}</div>
                  <span style={{
                    display: "inline-block", marginTop: 4,
                    fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 11,
                    color: "var(--success-600)", background: "var(--success-100)",
                    padding: "2px 8px", borderRadius: "var(--radius-full)",
                  }}>{b.saving}</span>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--text-strong)" }}>
                    ${b.price}
                  </div>
                  <Link href="/crear" style={{
                    display: "inline-flex", marginTop: 6,
                    fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 12,
                    color: "#fff", background: "var(--gradient-gold)",
                    padding: "6px 14px", borderRadius: "var(--radius-full)",
                    textDecoration: "none",
                  }}>Elegir</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Garantía */}
        <div style={{ textAlign: "center", marginTop: 32, padding: "20px", background: "var(--surface-magic)", borderRadius: "var(--radius-xl)" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🛡️</div>
          <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14, color: "var(--brand-ai)", marginBottom: 4 }}>
            Garantía de satisfacción
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)" }}>
            Si no quedas satisfecho con tu canción, la rehacemos sin costo adicional.
          </div>
        </div>
      </div>
    </div>
  );
}
