"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const BENEFICIOS = [
  { emoji: "💰", titulo: "30% de comisión", desc: "Por cada canción vendida con tu link" },
  { emoji: "⚡", titulo: "Pagos semanales", desc: "Directo a tu cuenta cada lunes" },
  { emoji: "🎵", titulo: "1 canción gratis al mes", desc: "Para ti o para regalar" },
  { emoji: "📊", titulo: "Dashboard en tiempo real", desc: "Ve tus ventas y comisiones al instante" },
  { emoji: "🏆", titulo: "Bonos por nivel", desc: "Mientras más vendes, más ganas" },
  { emoji: "🤝", titulo: "Soporte dedicado", desc: "Acceso directo al equipo MiCancion" },
];

const NIVELES = [
  { nombre: "Estrella", ventas: "1–10", comision: "30%", color: "var(--amarillo-600)", emoji: "⭐" },
  { nombre: "Super Estrella", ventas: "11–50", comision: "35%", color: "var(--magenta-600)", emoji: "🌟" },
  { nombre: "Leyenda", ventas: "51+", comision: "40%", color: "var(--teal-600)", emoji: "👑" },
];

const PASOS_ONBOARDING = ["Bienvenida", "Beneficios", "Tu link", "¡Listo!"];

export default function EmbajadorPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [nombre, setNombre] = useState("");
  const [copiado, setCopiado] = useState(false);

  const linkRef = `micancion.app/ref/${nombre.toLowerCase().replace(/\s+/g, "") || "tunombre"}`;

  function copiar() {
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Barra de progreso */}
      <div style={{ height: 3, background: "var(--ink-200)" }}>
        <div style={{
          height: "100%",
          width: `${((paso + 1) / PASOS_ONBOARDING.length) * 100}%`,
          background: "var(--gradient-magic)",
          transition: "width 0.4s ease",
        }} />
      </div>

      <main style={{
        flex: 1, maxWidth: 600, width: "100%", margin: "0 auto",
        padding: "40px 20px 80px",
        animation: "fade-up 0.4s ease both",
      }}>

        {/* Indicador de pasos */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 8, marginBottom: 40,
        }}>
          {PASOS_ONBOARDING.map((p, i) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: i <= paso ? "var(--gradient-magic)" : "var(--ink-100)",
                border: i === paso ? "none" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 12,
                color: i <= paso ? "#fff" : "var(--ink-400)",
                transition: "all 0.3s ease",
                boxShadow: i === paso ? "var(--shadow-magic)" : "none",
              }}>{i < paso ? "✓" : i + 1}</div>
              {i < PASOS_ONBOARDING.length - 1 && (
                <div style={{
                  width: 32, height: 2, borderRadius: 2,
                  background: i < paso ? "var(--magenta-300)" : "var(--ink-200)",
                  transition: "background 0.3s",
                }} />
              )}
            </div>
          ))}
        </div>

        {/* ── Paso 0: Bienvenida ── */}
        {paso === 0 && (
          <div style={{ textAlign: "center", animation: "fade-up 0.3s ease both" }}>
            <div style={{ fontSize: 64, marginBottom: 20, animation: "pop 0.5s ease both" }}>🎤</div>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(26px, 5vw, 38px)",
              color: "var(--text-strong)", marginBottom: 12, lineHeight: 1.2,
            }}>
              Conviértete en<br />
              <span style={{
                background: "var(--gradient-magic)", WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Embajador MiCancion</span>
            </h1>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-muted)",
              maxWidth: 420, margin: "0 auto 32px",
              lineHeight: 1.7,
            }}>
              Comparte el amor por la música personalizada y gana <strong>30% de comisión</strong> por cada canción vendida con tu link.
            </p>

            {/* Stats rápidas */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 36,
            }}>
              {[
                { valor: "30%", label: "Comisión base" },
                { valor: "$11.70", label: "Por canción" },
                { valor: "Semanal", label: "Frecuencia de pago" },
              ].map((s) => (
                <div key={s.label} style={{
                  background: "var(--surface-card)", borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-subtle)", padding: "16px 10px",
                  boxShadow: "var(--shadow-card)",
                }}>
                  <div style={{
                    fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22,
                    background: "var(--gradient-magic)", WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>{s.valor}</div>
                  <div style={{
                    fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--text-muted)",
                    marginTop: 4,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPaso(1)}
              style={{
                height: 52, padding: "0 40px", borderRadius: "var(--radius-full)",
                background: "var(--gradient-magic)", color: "#fff",
                fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 16,
                border: "none", cursor: "pointer", boxShadow: "var(--shadow-magic)",
              }}
            >
              Quiero ser embajador →
            </button>
          </div>
        )}

        {/* ── Paso 1: Beneficios ── */}
        {paso === 1 && (
          <div style={{ animation: "fade-up 0.3s ease both" }}>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28,
              color: "var(--text-strong)", marginBottom: 6, textAlign: "center",
            }}>Lo que obtienes</h2>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)",
              textAlign: "center", marginBottom: 28,
            }}>Todo lo que necesitas para ganar compartiendo música</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 12, marginBottom: 28 }}>
              {BENEFICIOS.map((b) => (
                <div key={b.titulo} style={{
                  background: "var(--surface-card)", borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-subtle)", padding: "18px",
                  boxShadow: "var(--shadow-card)",
                  display: "flex", gap: 12, alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{b.emoji}</span>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14,
                      color: "var(--text-strong)", marginBottom: 4,
                    }}>{b.titulo}</div>
                    <div style={{
                      fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)",
                    }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Niveles */}
            <h3 style={{
              fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 15,
              color: "var(--text-strong)", marginBottom: 12,
            }}>Niveles de comisión</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 28 }}>
              {NIVELES.map((n) => (
                <div key={n.nombre} style={{
                  background: "var(--surface-card)", borderRadius: "var(--radius-lg)",
                  border: `1.5px solid ${n.color}20`,
                  padding: "16px 12px", textAlign: "center",
                  boxShadow: "var(--shadow-card)",
                }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{n.emoji}</div>
                  <div style={{
                    fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13,
                    color: n.color, marginBottom: 4,
                  }}>{n.nombre}</div>
                  <div style={{
                    fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20,
                    color: "var(--text-strong)",
                  }}>{n.comision}</div>
                  <div style={{
                    fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--text-subtle)",
                  }}>{n.ventas} ventas/mes</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPaso(2)}
              style={{
                width: "100%", height: 52, borderRadius: "var(--radius-full)",
                background: "var(--gradient-magic)", color: "#fff",
                fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 16,
                border: "none", cursor: "pointer", boxShadow: "var(--shadow-magic)",
              }}
            >
              Continuar →
            </button>
          </div>
        )}

        {/* ── Paso 2: Tu link ── */}
        {paso === 2 && (
          <div style={{ animation: "fade-up 0.3s ease both" }}>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28,
              color: "var(--text-strong)", marginBottom: 6, textAlign: "center",
            }}>Tu link personalizado</h2>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)",
              textAlign: "center", marginBottom: 32,
            }}>Elige cómo se verá tu link de embajador</p>

            <div style={{
              background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-subtle)", padding: "24px",
              boxShadow: "var(--shadow-card)", marginBottom: 20,
            }}>
              <label style={{
                fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13,
                color: "var(--text-muted)", display: "block", marginBottom: 8,
              }}>Tu nombre o apodo</label>
              <input
                type="text"
                placeholder="Ej: carlos, musiclover, laurabeats..."
                value={nombre}
                onChange={(e) => setNombre(e.target.value.toLowerCase().replace(/\s+/g, ""))}
                style={{
                  width: "100%", height: 48, padding: "0 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1.5px solid var(--border-subtle)",
                  background: "var(--surface-page)",
                  fontFamily: "var(--font-ui)", fontSize: 15,
                  color: "var(--text-body)", outline: "none",
                  marginBottom: 20,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--magenta-300)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
              />

              <label style={{
                fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13,
                color: "var(--text-muted)", display: "block", marginBottom: 8,
              }}>Tu link de embajador</label>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "var(--surface-page)", borderRadius: "var(--radius-md)",
                border: "1.5px solid var(--border-subtle)", padding: "0 14px",
                height: 48,
              }}>
                <span style={{
                  fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--text-muted)",
                  flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>🔗 {linkRef}</span>
                <button
                  onClick={copiar}
                  style={{
                    padding: "5px 12px", borderRadius: "var(--radius-full)",
                    background: copiado ? "var(--success-100)" : "var(--gradient-magic)",
                    color: copiado ? "var(--success-600)" : "#fff",
                    border: copiado ? "1px solid var(--success-600)" : "none",
                    fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 12,
                    cursor: "pointer", flexShrink: 0, transition: "all 0.2s",
                  }}
                >{copiado ? "✓ Copiado" : "Copiar"}</button>
              </div>
            </div>

            <button
              onClick={() => setPaso(3)}
              disabled={!nombre}
              style={{
                width: "100%", height: 52, borderRadius: "var(--radius-full)",
                background: nombre ? "var(--gradient-magic)" : "var(--ink-200)",
                color: nombre ? "#fff" : "var(--ink-400)",
                fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 16,
                border: "none", cursor: nombre ? "pointer" : "not-allowed",
                boxShadow: nombre ? "var(--shadow-magic)" : "none",
                transition: "all 0.2s",
              }}
            >
              Activar mi cuenta →
            </button>
          </div>
        )}

        {/* ── Paso 3: ¡Listo! ── */}
        {paso === 3 && (
          <div style={{ textAlign: "center", animation: "fade-up 0.3s ease both" }}>
            <div style={{ fontSize: 72, marginBottom: 20, animation: "pop 0.5s ease both" }}>🎊</div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32,
              color: "var(--text-strong)", marginBottom: 10,
            }}>¡Ya eres Embajador!</h2>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-muted)",
              maxWidth: 380, margin: "0 auto 32px", lineHeight: 1.7,
            }}>
              Tu link está activo. Compártelo y empieza a ganar desde la primera venta.
            </p>

            {/* Link destacado */}
            <div style={{
              background: "var(--gradient-night)", borderRadius: "var(--radius-xl)",
              padding: "20px 24px", marginBottom: 28,
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
            }}>
              <span style={{
                fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 15,
                color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>🔗 {linkRef}</span>
              <button
                onClick={copiar}
                style={{
                  padding: "8px 16px", borderRadius: "var(--radius-full)",
                  background: copiado ? "var(--success-100)" : "var(--gradient-magic)",
                  color: copiado ? "var(--success-600)" : "#fff",
                  border: "none", fontFamily: "var(--font-ui)", fontWeight: 700,
                  fontSize: 13, cursor: "pointer", flexShrink: 0, transition: "all 0.2s",
                }}
              >{copiado ? "✓ Copiado" : "Copiar link"}</button>
            </div>

            {/* Compartir en redes */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 32 }}>
              {[
                { red: "WhatsApp", emoji: "💬", color: "#25D366" },
                { red: "Instagram", emoji: "📸", color: "var(--magenta-600)" },
                { red: "TikTok", emoji: "🎵", color: "var(--ink-900)" },
              ].map((r) => (
                <button key={r.red} style={{
                  height: 44, borderRadius: "var(--radius-full)",
                  background: "var(--surface-card)",
                  border: "1.5px solid var(--border-subtle)",
                  fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13,
                  color: "var(--text-muted)", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  transition: "all 0.15s",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = r.color;
                    e.currentTarget.style.color = r.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                    e.currentTarget.style.color = "var(--text-muted)";
                  }}
                >
                  <span>{r.emoji}</span> {r.red}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              style={{
                width: "100%", height: 52, borderRadius: "var(--radius-full)",
                background: "var(--gradient-magic)", color: "#fff",
                fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 16,
                border: "none", cursor: "pointer", boxShadow: "var(--shadow-magic)",
              }}
            >
              Ir a mi panel →
            </button>
          </div>
        )}

        {/* Botón atrás */}
        {paso > 0 && paso < 3 && (
          <button
            onClick={() => setPaso(paso - 1)}
            style={{
              display: "block", margin: "20px auto 0",
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--text-subtle)",
            }}
          >
            ← Volver
          </button>
        )}
      </main>
    </div>
  );
}
