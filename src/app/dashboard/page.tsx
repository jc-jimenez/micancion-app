"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

// ─── Datos mock ───────────────────────────────────────────────────────────────

const CANCIONES = [
  {
    id: 1,
    titulo: "Esta canción es para ti",
    para: "Para Laura · Aniversario",
    estilo: "Pop romántico",
    fecha: "Hoy",
    duracion: "3:07",
    emoji: "💍",
    color: "var(--magenta-600)",
  },
  {
    id: 2,
    titulo: "Feliz cumpleaños mamá",
    para: "Para Carmen · Cumpleaños",
    estilo: "Balada",
    fecha: "Hace 3 días",
    duracion: "2:54",
    emoji: "🎂",
    color: "var(--coral-600)",
  },
  {
    id: 3,
    titulo: "Gracias por todo",
    para: "Para el equipo · Agradecimiento",
    estilo: "Acústico",
    fecha: "Hace 1 semana",
    duracion: "3:22",
    emoji: "🙏",
    color: "var(--teal-600)",
  },
];

const HISTORIAL = [
  { fecha: "Hoy 14:32", accion: "Canción creada", detalle: "Esta canción es para ti", emoji: "🎵" },
  { fecha: "Hoy 14:28", accion: "Pago procesado", detalle: "$39 · Visa ****5682", emoji: "✅" },
  { fecha: "Hace 3 días", accion: "Canción creada", detalle: "Feliz cumpleaños mamá", emoji: "🎵" },
  { fecha: "Hace 3 días", accion: "Descarga MP3", detalle: "Feliz cumpleaños mamá", emoji: "⬇️" },
  { fecha: "Hace 1 semana", accion: "Canción creada", detalle: "Gracias por todo", emoji: "🎵" },
];

const TABS = ["Biblioteca", "Historial", "Wallet", "Privacidad"];

// ─── Componentes ──────────────────────────────────────────────────────────────

function CancionCard({ c, onPlay }: { c: typeof CANCIONES[0]; onPlay: () => void }) {
  const [playing, setPlaying] = useState(false);

  function toggle() {
    setPlaying(!playing);
    onPlay();
  }

  return (
    <div style={{
      background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
      border: "1px solid var(--border-subtle)", padding: "18px 20px",
      boxShadow: "var(--shadow-card)",
      display: "flex", alignItems: "center", gap: 14,
      transition: "box-shadow 0.2s",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-card)")}
    >
      {/* Cover */}
      <div style={{
        width: 52, height: 52, borderRadius: "var(--radius-md)", flexShrink: 0,
        background: `linear-gradient(135deg, ${c.color}, var(--coral-500))`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24,
      }}>{c.emoji}</div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14,
          color: "var(--text-strong)",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{c.titulo}</div>
        <div style={{
          fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", marginTop: 2,
        }}>{c.para}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
          <span style={{
            padding: "2px 8px", borderRadius: "var(--radius-full)",
            background: "var(--ink-100)", fontFamily: "var(--font-ui)",
            fontSize: 11, color: "var(--text-subtle)", fontWeight: 600,
          }}>{c.estilo}</span>
          <span style={{
            padding: "2px 8px", borderRadius: "var(--radius-full)",
            background: "var(--ink-100)", fontFamily: "var(--font-ui)",
            fontSize: 11, color: "var(--text-subtle)", fontWeight: 600,
          }}>{c.duracion}</span>
          <span style={{
            padding: "2px 8px", borderRadius: "var(--radius-full)",
            background: "var(--ink-100)", fontFamily: "var(--font-ui)",
            fontSize: 11, color: "var(--text-subtle)", fontWeight: 600,
          }}>{c.fecha}</span>
        </div>
      </div>

      {/* Acciones */}
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          onClick={toggle}
          style={{
            width: 38, height: 38, borderRadius: "50%",
            background: playing ? "var(--gradient-magic)" : "var(--ink-100)",
            border: "none", cursor: "pointer", fontSize: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
            boxShadow: playing ? "var(--shadow-magic)" : "none",
          }}
        >{playing ? "⏸" : "▶"}</button>
        <button style={{
          width: 38, height: 38, borderRadius: "50%",
          background: "var(--ink-100)", border: "none", cursor: "pointer",
          fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
        }}>⬇️</button>
      </div>
    </div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState("Biblioteca");
  const [saldo] = useState(12.50);

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{
        flex: 1, maxWidth: 700, width: "100%", margin: "0 auto",
        padding: "32px 20px 80px",
        animation: "fade-up 0.4s ease both",
      }}>

        {/* Header usuario */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14, marginBottom: 28,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
            background: "var(--gradient-magic)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 800, color: "#fff",
            fontFamily: "var(--font-display)",
            boxShadow: "var(--shadow-magic)",
          }}>C</div>
          <div>
            <div style={{
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20,
              color: "var(--text-strong)",
            }}>Hola, Carlos 👋</div>
            <div style={{
              fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)",
            }}>juancarlos@email.com · 3 canciones creadas</div>
          </div>
          <div style={{ flex: 1 }} />
          <button
            onClick={() => router.push("/crear")}
            style={{
              height: 38, padding: "0 16px", borderRadius: "var(--radius-full)",
              background: "var(--gradient-magic)", color: "#fff",
              fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13,
              border: "none", cursor: "pointer",
              boxShadow: "var(--shadow-magic)",
              whiteSpace: "nowrap",
            }}
          >+ Crear ✨</button>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 4,
          background: "var(--ink-100)", borderRadius: "var(--radius-lg)",
          padding: 4, marginBottom: 24,
        }}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, height: 36, borderRadius: "var(--radius-md)",
                border: "none", cursor: "pointer",
                background: tab === t ? "var(--surface-card)" : "transparent",
                fontFamily: "var(--font-ui)", fontWeight: tab === t ? 700 : 500,
                fontSize: 13,
                color: tab === t ? "var(--text-strong)" : "var(--text-muted)",
                boxShadow: tab === t ? "var(--shadow-sm)" : "none",
                transition: "all 0.2s ease",
              }}
            >{t}</button>
          ))}
        </div>

        {/* ── Biblioteca ── */}
        {tab === "Biblioteca" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fade-up 0.25s ease both" }}>
            {CANCIONES.map((c) => (
              <CancionCard key={c.id} c={c} onPlay={() => {}} />
            ))}
            <div style={{ textAlign: "center", paddingTop: 12 }}>
              <button
                onClick={() => router.push("/crear")}
                style={{
                  height: 44, padding: "0 24px", borderRadius: "var(--radius-full)",
                  background: "none",
                  border: "1.5px dashed var(--border-strong)",
                  fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 14,
                  color: "var(--text-muted)", cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--magenta-300)";
                  e.currentTarget.style.color = "var(--magenta-600)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                + Crear nueva canción
              </button>
            </div>
          </div>
        )}

        {/* ── Historial ── */}
        {tab === "Historial" && (
          <div style={{
            background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-subtle)", overflow: "hidden",
            boxShadow: "var(--shadow-card)",
            animation: "fade-up 0.25s ease both",
          }}>
            {HISTORIAL.map((h, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 20px",
                borderBottom: i < HISTORIAL.length - 1 ? "1px solid var(--border-subtle)" : "none",
              }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{h.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13,
                    color: "var(--text-strong)",
                  }}>{h.accion}</div>
                  <div style={{
                    fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)",
                  }}>{h.detalle}</div>
                </div>
                <div style={{
                  fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--text-subtle)",
                  whiteSpace: "nowrap",
                }}>{h.fecha}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Wallet ── */}
        {tab === "Wallet" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fade-up 0.25s ease both" }}>
            <div style={{
              background: "var(--gradient-night)", borderRadius: "var(--radius-xl)",
              padding: "28px 24px", color: "#fff",
              boxShadow: "0 8px 32px rgba(45,27,46,0.25)",
            }}>
              <div style={{
                fontFamily: "var(--font-ui)", fontSize: 13,
                color: "rgba(255,255,255,0.5)", marginBottom: 8,
              }}>Saldo disponible</div>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40,
                color: "#fff", marginBottom: 4,
              }}>${saldo.toFixed(2)}</div>
              <div style={{
                fontFamily: "var(--font-ui)", fontSize: 12,
                color: "rgba(255,255,255,0.4)",
              }}>Créditos para efectos especiales</div>
            </div>

            <div style={{
              background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-subtle)", padding: "20px",
              boxShadow: "var(--shadow-card)",
            }}>
              <h3 style={{
                fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14,
                color: "var(--text-strong)", marginBottom: 16,
              }}>Recargar créditos</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {[{ monto: 10, bonus: "" }, { monto: 25, bonus: "+$3" }, { monto: 50, bonus: "+$10" }].map((op) => (
                  <button key={op.monto} style={{
                    padding: "14px 8px", borderRadius: "var(--radius-lg)",
                    border: "1.5px solid var(--border-subtle)",
                    background: "var(--surface-page)", cursor: "pointer",
                    fontFamily: "var(--font-ui)", textAlign: "center",
                    transition: "all 0.15s",
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--magenta-300)";
                      e.currentTarget.style.background = "var(--magenta-050)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                      e.currentTarget.style.background = "var(--surface-page)";
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: 18, color: "var(--text-strong)" }}>${op.monto}</div>
                    {op.bonus && (
                      <div style={{ fontSize: 11, color: "var(--success-600)", fontWeight: 700, marginTop: 2 }}>
                        Bonus {op.bonus}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Privacidad ── */}
        {tab === "Privacidad" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fade-up 0.25s ease both" }}>
            {[
              { titulo: "Canciones privadas por defecto", desc: "Solo tú puedes ver tus canciones", activo: true },
              { titulo: "Permitir uso en ejemplos", desc: "Tu canción puede aparecer como muestra anónima", activo: false },
              { titulo: "Emails de novedades", desc: "Recibe tips y descuentos ocasionales", activo: true },
              { titulo: "Autenticación de dos factores", desc: "Mayor seguridad para tu cuenta", activo: false },
            ].map((item) => (
              <ToggleRow key={item.titulo} {...item} />
            ))}

            <div style={{
              marginTop: 8, padding: "16px 20px",
              background: "var(--error-100)", borderRadius: "var(--radius-lg)",
              border: "1px solid var(--error-600)",
            }}>
              <div style={{
                fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13,
                color: "var(--error-600)", marginBottom: 4,
              }}>Zona de peligro</div>
              <div style={{
                fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)", marginBottom: 12,
              }}>Eliminar cuenta borra todas tus canciones permanentemente.</div>
              <button style={{
                padding: "8px 16px", borderRadius: "var(--radius-full)",
                border: "1.5px solid var(--error-600)", background: "none",
                fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13,
                color: "var(--error-600)", cursor: "pointer",
              }}>
                Eliminar mi cuenta
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ToggleRow({ titulo, desc, activo: inicial }: { titulo: string; desc: string; activo: boolean }) {
  const [activo, setActivo] = useState(inicial);
  return (
    <div style={{
      background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
      border: "1px solid var(--border-subtle)", padding: "16px 20px",
      display: "flex", alignItems: "center", gap: 14,
      boxShadow: "var(--shadow-card)",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14,
          color: "var(--text-strong)",
        }}>{titulo}</div>
        <div style={{
          fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", marginTop: 2,
        }}>{desc}</div>
      </div>
      <button
        onClick={() => setActivo(!activo)}
        style={{
          width: 44, height: 24, borderRadius: "var(--radius-full)",
          background: activo ? "var(--gradient-magic)" : "var(--ink-200)",
          border: "none", cursor: "pointer", position: "relative",
          transition: "background 0.25s", flexShrink: 0,
          boxShadow: activo ? "var(--shadow-magic)" : "none",
        }}
      >
        <div style={{
          position: "absolute", top: 2,
          left: activo ? 22 : 2,
          width: 20, height: 20, borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          transition: "left 0.25s",
        }} />
      </button>
    </div>
  );
}
