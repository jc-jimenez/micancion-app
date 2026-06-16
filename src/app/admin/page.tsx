"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

// ─── Datos mock ───────────────────────────────────────────────────────────────

const STATS = [
  { emoji: "🎵", label: "Canciones creadas", valor: "1,284", delta: "+18% esta semana", positivo: true },
  { emoji: "💰", label: "Ingresos totales", valor: "$47,316", delta: "+23% este mes", positivo: true },
  { emoji: "👥", label: "Usuarios registrados", valor: "3,841", delta: "+142 hoy", positivo: true },
  { emoji: "🤝", label: "Embajadores activos", valor: "67", delta: "-2 esta semana", positivo: false },
];

const PEDIDOS = [
  { id: "#8821", usuario: "Laura M.", cancion: "Boda de ensueño", plan: "Con Tu Voz", monto: 74, estado: "completado", fecha: "Hoy 15:42" },
  { id: "#8820", usuario: "Carlos J.", cancion: "Esta canción es para ti", plan: "Canción IA", monto: 39, estado: "completado", fecha: "Hoy 14:31" },
  { id: "#8819", usuario: "Pedro A.", cancion: "Feliz cumpleaños papá", plan: "Canción IA", monto: 39, estado: "generando", fecha: "Hoy 14:28" },
  { id: "#8818", usuario: "María R.", cancion: "Gracias equipo", plan: "Premium", monto: 124, estado: "completado", fecha: "Hoy 13:10" },
  { id: "#8817", usuario: "Ana P.", cancion: "Mi bebé llegó", plan: "Con Tu Voz", monto: 74, estado: "fallido", fecha: "Hoy 12:55" },
  { id: "#8816", usuario: "Luis G.", cancion: "Te amo mamá", plan: "Canción IA", monto: 39, estado: "completado", fecha: "Ayer 23:14" },
];

const EMBAJADORES = [
  { nombre: "Diego R.", link: "micancion.app/ref/diego", ventas: 42, comision: "$1,234", nivel: "Super Estrella", emoji: "🌟" },
  { nombre: "Sofía M.", link: "micancion.app/ref/sofia", ventas: 28, comision: "$812", nivel: "Super Estrella", emoji: "🌟" },
  { nombre: "Andrés V.", link: "micancion.app/ref/andres", ventas: 71, comision: "$2,840", nivel: "Leyenda", emoji: "👑" },
  { nombre: "Camila T.", link: "micancion.app/ref/camila", ventas: 6, comision: "$175", nivel: "Estrella", emoji: "⭐" },
];

const TABS = ["Resumen", "Pedidos", "Usuarios", "Embajadores", "Configuración"];

const ESTADO_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  completado: { bg: "var(--success-100)", color: "var(--success-600)", label: "✓ Completado" },
  generando: { bg: "var(--amarillo-100)", color: "var(--amarillo-700)", label: "⏳ Generando" },
  fallido: { bg: "var(--error-100)", color: "var(--error-600)", label: "✗ Fallido" },
};

// ─── Componentes ──────────────────────────────────────────────────────────────

function StatCard({ emoji, label, valor, delta, positivo }: typeof STATS[0]) {
  return (
    <div style={{
      background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
      border: "1px solid var(--border-subtle)", padding: "20px",
      boxShadow: "var(--shadow-card)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ fontSize: 24 }}>{emoji}</span>
        <span style={{
          fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700,
          color: positivo ? "var(--success-600)" : "var(--error-600)",
          background: positivo ? "var(--success-100)" : "var(--error-100)",
          padding: "3px 8px", borderRadius: "var(--radius-full)",
        }}>{delta}</span>
      </div>
      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26,
        color: "var(--text-strong)", marginBottom: 4,
      }}>{valor}</div>
      <div style={{
        fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--text-muted)",
      }}>{label}</div>
    </div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [tab, setTab] = useState("Resumen");
  const [busqueda, setBusqueda] = useState("");

  const pedidosFiltrados = PEDIDOS.filter((p) =>
    p.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.cancion.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.id.includes(busqueda)
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{
        flex: 1, maxWidth: 900, width: "100%", margin: "0 auto",
        padding: "32px 20px 80px",
        animation: "fade-up 0.4s ease both",
      }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 10px", borderRadius: "var(--radius-full)",
              background: "var(--error-100)", marginBottom: 6,
            }}>
              <span style={{ fontSize: 10, color: "var(--error-600)" }}>●</span>
              <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 11, color: "var(--error-600)" }}>ADMIN</span>
            </div>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26,
              color: "var(--text-strong)",
            }}>Panel de Administración</h1>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{
              height: 36, padding: "0 16px", borderRadius: "var(--radius-full)",
              border: "1.5px solid var(--border-subtle)", background: "var(--surface-card)",
              fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13,
              color: "var(--text-muted)", cursor: "pointer",
            }}>⬇ Exportar</button>
            <button style={{
              height: 36, padding: "0 16px", borderRadius: "var(--radius-full)",
              background: "var(--gradient-magic)", color: "#fff",
              fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13,
              border: "none", cursor: "pointer", boxShadow: "var(--shadow-magic)",
            }}>+ Nueva promo</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 4,
          background: "var(--ink-100)", borderRadius: "var(--radius-lg)",
          padding: 4, marginBottom: 24, overflowX: "auto",
        }}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flexShrink: 0,
                padding: "0 16px", height: 36, borderRadius: "var(--radius-md)",
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

        {/* ── Resumen ── */}
        {tab === "Resumen" && (
          <div style={{ animation: "fade-up 0.25s ease both" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
              gap: 14, marginBottom: 28,
            }}>
              {STATS.map((s) => <StatCard key={s.label} {...s} />)}
            </div>

            {/* Ingresos por plan */}
            <div style={{
              background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-subtle)", padding: "20px",
              boxShadow: "var(--shadow-card)", marginBottom: 20,
            }}>
              <h3 style={{
                fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14,
                color: "var(--text-strong)", marginBottom: 16,
              }}>Ingresos por plan</h3>
              {[
                { plan: "Canción IA", pct: 48, monto: "$22,711", color: "var(--magenta-600)" },
                { plan: "Con Tu Voz", pct: 35, monto: "$16,561", color: "var(--coral-600)" },
                { plan: "Premium", pct: 17, monto: "$8,044", color: "var(--teal-600)" },
              ].map((p) => (
                <div key={p.plan} style={{ marginBottom: 14 }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between", marginBottom: 6,
                    fontFamily: "var(--font-ui)", fontSize: 13,
                  }}>
                    <span style={{ fontWeight: 600, color: "var(--text-body)" }}>{p.plan}</span>
                    <span style={{ color: "var(--text-muted)" }}>{p.monto} · {p.pct}%</span>
                  </div>
                  <div style={{
                    height: 8, borderRadius: "var(--radius-full)",
                    background: "var(--ink-100)", overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", width: `${p.pct}%`,
                      background: p.color, borderRadius: "var(--radius-full)",
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Últimos pedidos rápidos */}
            <div style={{
              background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-subtle)", overflow: "hidden",
              boxShadow: "var(--shadow-card)",
            }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
                <h3 style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14, color: "var(--text-strong)" }}>
                  Últimos pedidos
                </h3>
              </div>
              {PEDIDOS.slice(0, 4).map((p, i) => {
                const est = ESTADO_COLORS[p.estado];
                return (
                  <div key={p.id} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "12px 20px",
                    borderBottom: i < 3 ? "1px solid var(--border-subtle)" : "none",
                  }}>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--text-subtle)", flexShrink: 0 }}>{p.id}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13, color: "var(--text-strong)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.usuario}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)" }}>{p.cancion}</div>
                    </div>
                    <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13, color: "var(--text-strong)", flexShrink: 0 }}>${p.monto}</span>
                    <span style={{
                      padding: "3px 10px", borderRadius: "var(--radius-full)",
                      background: est.bg, color: est.color,
                      fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 11,
                      flexShrink: 0,
                    }}>{est.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Pedidos ── */}
        {tab === "Pedidos" && (
          <div style={{ animation: "fade-up 0.25s ease both" }}>
            <input
              placeholder="Buscar por usuario, canción o #ID..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                width: "100%", height: 44, padding: "0 16px",
                borderRadius: "var(--radius-lg)",
                border: "1.5px solid var(--border-subtle)",
                background: "var(--surface-card)",
                fontFamily: "var(--font-ui)", fontSize: 14,
                color: "var(--text-body)", outline: "none", marginBottom: 16,
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--magenta-300)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
            />
            <div style={{
              background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-subtle)", overflow: "hidden",
              boxShadow: "var(--shadow-card)",
            }}>
              {pedidosFiltrados.length === 0 ? (
                <div style={{ padding: 40, textAlign: "center", color: "var(--text-subtle)", fontFamily: "var(--font-ui)" }}>
                  Sin resultados para "{busqueda}"
                </div>
              ) : pedidosFiltrados.map((p, i) => {
                const est = ESTADO_COLORS[p.estado];
                return (
                  <div key={p.id} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "14px 20px",
                    borderBottom: i < pedidosFiltrados.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    flexWrap: "wrap", rowGap: 6,
                  }}>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--text-subtle)", flexShrink: 0, minWidth: 50 }}>{p.id}</span>
                    <div style={{ flex: 1, minWidth: 120 }}>
                      <div style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13, color: "var(--text-strong)" }}>{p.usuario}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)" }}>{p.cancion} · {p.plan}</div>
                    </div>
                    <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14, color: "var(--text-strong)", flexShrink: 0 }}>${p.monto}</span>
                    <span style={{
                      padding: "4px 10px", borderRadius: "var(--radius-full)",
                      background: est.bg, color: est.color,
                      fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 11, flexShrink: 0,
                    }}>{est.label}</span>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--text-subtle)", flexShrink: 0 }}>{p.fecha}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Usuarios ── */}
        {tab === "Usuarios" && (
          <div style={{ animation: "fade-up 0.25s ease both" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Total usuarios", valor: "3,841" },
                { label: "Activos hoy", valor: "284" },
                { label: "Con cuenta", valor: "2,106" },
                { label: "Recurrentes", valor: "431" },
              ].map((s) => (
                <div key={s.label} style={{
                  background: "var(--surface-card)", borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-subtle)", padding: "16px",
                  boxShadow: "var(--shadow-card)", textAlign: "center",
                }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--text-strong)" }}>{s.valor}</div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{
              background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-subtle)", padding: 20,
              boxShadow: "var(--shadow-card)",
              fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)",
              textAlign: "center",
            }}>
              🔍 Búsqueda avanzada de usuarios disponible próximamente
            </div>
          </div>
        )}

        {/* ── Embajadores ── */}
        {tab === "Embajadores" && (
          <div style={{ animation: "fade-up 0.25s ease both" }}>
            <div style={{
              background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-subtle)", overflow: "hidden",
              boxShadow: "var(--shadow-card)",
            }}>
              {EMBAJADORES.map((e, i) => (
                <div key={e.nombre} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "16px 20px",
                  borderBottom: i < EMBAJADORES.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  flexWrap: "wrap", rowGap: 8,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "var(--gradient-magic)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                  }}>{e.nombre[0]}</div>
                  <div style={{ flex: 1, minWidth: 100 }}>
                    <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14, color: "var(--text-strong)" }}>{e.nombre}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)" }}>{e.link}</div>
                  </div>
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-strong)" }}>{e.ventas}</div>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--text-subtle)" }}>ventas</div>
                  </div>
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--success-600)" }}>{e.comision}</div>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--text-subtle)" }}>comisión</div>
                  </div>
                  <span style={{
                    padding: "4px 12px", borderRadius: "var(--radius-full)",
                    background: "var(--magenta-050)", color: "var(--magenta-700)",
                    fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 12, flexShrink: 0,
                  }}>{e.emoji} {e.nivel}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Configuración ── */}
        {tab === "Configuración" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fade-up 0.25s ease both" }}>
            {[
              { titulo: "Modo mantenimiento", desc: "Desactiva el sitio para el público temporalmente" },
              { titulo: "Generación de canciones activa", desc: "Permite crear nuevas canciones" },
              { titulo: "Registro de nuevos usuarios", desc: "Permite que nuevos usuarios se registren" },
              { titulo: "Programa de embajadores", desc: "Activa el onboarding de embajadores" },
              { titulo: "Notificaciones por email", desc: "Envía emails automáticos a los usuarios" },
            ].map((item) => (
              <ConfigToggle key={item.titulo} {...item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function ConfigToggle({ titulo, desc }: { titulo: string; desc: string }) {
  const [activo, setActivo] = useState(titulo !== "Modo mantenimiento");
  return (
    <div style={{
      background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
      border: "1px solid var(--border-subtle)", padding: "18px 20px",
      display: "flex", alignItems: "center", gap: 14, boxShadow: "var(--shadow-card)",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14, color: "var(--text-strong)" }}>{titulo}</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{desc}</div>
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
          background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          transition: "left 0.25s",
        }} />
      </button>
    </div>
  );
}
