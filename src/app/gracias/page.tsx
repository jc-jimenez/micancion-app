"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const BENEFICIOS = [
  { emoji: "🎵", texto: "Guarda todas tus canciones en tu biblioteca" },
  { emoji: "⚡", texto: "Crea nuevas canciones 3x más rápido" },
  { emoji: "💾", texto: "Descarga ilimitada en cualquier momento" },
  { emoji: "🎁", texto: "10% de descuento en tu próxima canción" },
];

export default function GraciasPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [registrado, setRegistrado] = useState(false);
  const [focusField, setFocusField] = useState<string | null>(null);

  const inputStyle = (field: string): React.CSSProperties => ({
    height: 48, padding: "0 14px", width: "100%",
    borderRadius: "var(--radius-md)",
    border: `1.5px solid ${focusField === field ? "var(--magenta-300)" : "var(--border-subtle)"}`,
    background: "var(--surface-card)",
    fontFamily: "var(--font-ui)", fontSize: 14,
    color: "var(--text-body)", outline: "none",
    transition: "border-color 0.2s",
  });

  function registrar() {
    if (!email.includes("@") || !pass || !nombre) return;
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setRegistrado(true);
    }, 1400);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{
        flex: 1, maxWidth: 520, width: "100%", margin: "0 auto",
        padding: "40px 20px 80px",
        animation: "fade-up 0.4s ease both",
      }}>

        {/* Confeti / celebración */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 56, marginBottom: 12, animation: "pop 0.5s ease both" }}>🎉</div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(24px, 5vw, 34px)",
            color: "var(--text-strong)", marginBottom: 10, lineHeight: 1.2,
          }}>
            ¡Gracias por tu compra!
          </h1>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)",
            maxWidth: 380, margin: "0 auto",
          }}>
            Tu canción ya está lista. Recibirás el link de descarga en tu correo en unos minutos.
          </p>
        </div>

        {!registrado ? (
          <>
            {/* Card de signup */}
            <div style={{
              background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-subtle)", padding: "28px 24px",
              boxShadow: "var(--shadow-card)", marginBottom: 20,
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 12px", borderRadius: "var(--radius-full)",
                background: "var(--amarillo-100)", marginBottom: 16,
              }}>
                <span style={{ fontSize: 13 }}>⚡</span>
                <span style={{
                  fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 12,
                  color: "var(--amarillo-700)",
                }}>Crea tu cuenta gratis — tarda 20 segundos</span>
              </div>

              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20,
                color: "var(--text-strong)", marginBottom: 6,
              }}>Guarda tu canción para siempre</h2>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)",
                marginBottom: 20,
              }}>
                Sin cuenta tu canción expira en 7 días. Con cuenta es tuya para siempre.
              </p>

              {/* Beneficios */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                {BENEFICIOS.map((b) => (
                  <div key={b.texto} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--text-muted)",
                  }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{b.emoji}</span>
                    {b.texto}
                  </div>
                ))}
              </div>

              {/* Formulario */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  onFocus={() => setFocusField("nombre")}
                  onBlur={() => setFocusField(null)}
                  style={inputStyle("nombre")}
                />
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusField("email")}
                  onBlur={() => setFocusField(null)}
                  style={inputStyle("email")}
                />
                <input
                  type="password"
                  placeholder="Crea una contraseña"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  onFocus={() => setFocusField("pass")}
                  onBlur={() => setFocusField(null)}
                  style={inputStyle("pass")}
                />
                <button
                  onClick={registrar}
                  disabled={enviando}
                  style={{
                    height: 50, borderRadius: "var(--radius-full)",
                    background: enviando ? "var(--ink-200)" : "var(--gradient-magic)",
                    color: enviando ? "var(--ink-400)" : "#fff",
                    fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 15,
                    border: "none", cursor: enviando ? "not-allowed" : "pointer",
                    boxShadow: enviando ? "none" : "var(--shadow-magic)",
                    transition: "all 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                >
                  {enviando ? (
                    <>
                      <span style={{
                        width: 16, height: 16, borderRadius: "50%",
                        border: "2px solid var(--ink-300)", borderTopColor: "transparent",
                        display: "inline-block",
                        animation: "spin 0.7s linear infinite",
                      }} />
                      Creando cuenta...
                    </>
                  ) : "Crear cuenta gratis ✨"}
                </button>
              </div>
            </div>

            {/* Skip */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => router.push("/resultado")}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--text-subtle)",
                  textDecoration: "underline",
                }}
              >
                No gracias, ir a mi canción sin guardar
              </button>
            </div>
          </>
        ) : (
          /* Estado registrado */
          <div style={{
            background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
            border: "1px solid var(--success-600)", padding: "32px 24px",
            textAlign: "center", boxShadow: "var(--shadow-card)",
            animation: "pop 0.4s ease both",
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎊</div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22,
              color: "var(--text-strong)", marginBottom: 8,
            }}>¡Cuenta creada!</h2>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)",
              marginBottom: 24,
            }}>
              Bienvenido/a a MiCancion.app. Tu canción ya está guardada en tu biblioteca.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              style={{
                height: 48, padding: "0 28px", borderRadius: "var(--radius-full)",
                background: "var(--gradient-magic)", color: "#fff",
                fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 15,
                border: "none", cursor: "pointer",
                boxShadow: "var(--shadow-magic)",
              }}
            >
              Ir a mi biblioteca →
            </button>
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
