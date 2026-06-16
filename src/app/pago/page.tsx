"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCard(val: string) {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

function cardBrand(num: string) {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "💳 Visa";
  if (/^5[1-5]/.test(n)) return "💳 Mastercard";
  if (/^3[47]/.test(n)) return "💳 Amex";
  return "💳";
}

// ─── Componente de campo ──────────────────────────────────────────────────────

function Campo({
  label, children, error,
}: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13,
        color: "var(--text-muted)",
      }}>{label}</label>
      {children}
      {error && (
        <span style={{
          fontFamily: "var(--font-ui)", fontSize: 12,
          color: "var(--error-600)",
        }}>{error}</span>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  height: 48, padding: "0 14px",
  borderRadius: "var(--radius-md)",
  border: "1.5px solid var(--border-subtle)",
  background: "var(--surface-card)",
  fontFamily: "var(--font-ui)", fontSize: 15,
  color: "var(--text-body)", outline: "none",
  transition: "border-color 0.2s",
  width: "100%",
};

// ─── Página ───────────────────────────────────────────────────────────────────

export default function PagoPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const [procesando, setProcesando] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [focusField, setFocusField] = useState<string | null>(null);

  const precioTotal = 39;

  function validar() {
    const e: Record<string, string> = {};
    if (!nombre.trim()) e.nombre = "Ingresa el nombre del titular";
    if (tarjeta.replace(/\s/g, "").length < 16) e.tarjeta = "Número de tarjeta inválido";
    if (expiry.length < 5) e.expiry = "Fecha inválida";
    if (cvv.length < 3) e.cvv = "CVV inválido";
    if (!email.includes("@")) e.email = "Email inválido";
    return e;
  }

  function pagar() {
    const e = validar();
    if (Object.keys(e).length) { setErrores(e); return; }
    setErrores({});
    setProcesando(true);
    setTimeout(() => router.push("/generando"), 2000);
  }

  const fieldStyle = (field: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: errores[field]
      ? "var(--error-600)"
      : focusField === field
      ? "var(--magenta-300)"
      : "var(--border-subtle)",
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Progreso */}
      <div style={{ height: 3, background: "var(--ink-200)" }}>
        <div style={{ height: "100%", width: "85%", background: "var(--gradient-magic)", transition: "width 0.5s" }} />
      </div>

      <main style={{
        flex: 1, maxWidth: 520, width: "100%", margin: "0 auto",
        padding: "32px 20px 80px",
        animation: "fade-up 0.4s ease both",
      }}>

        {/* Encabezado */}
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(22px, 4vw, 30px)",
          color: "var(--text-strong)", marginBottom: 6,
        }}>Pago seguro 🔒</h1>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)",
          marginBottom: 28,
        }}>
          Entorno sandbox — usa la tarjeta de prueba abajo.
        </p>

        {/* Resumen del pedido */}
        <div style={{
          background: "var(--surface-info)", borderRadius: "var(--radius-lg)",
          border: "1px solid var(--magenta-100)", padding: "16px 18px",
          marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14,
              color: "var(--text-strong)",
            }}>🎵 Canción IA personalizada</div>
            <div style={{
              fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", marginTop: 2,
            }}>Pop romántico · Emotivo · Voz femenina</div>
          </div>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24,
            color: "var(--brand-primary)",
          }}>${precioTotal}</div>
        </div>

        {/* Tarjeta de prueba */}
        <div style={{
          background: "var(--amarillo-100)", borderRadius: "var(--radius-lg)",
          border: "1px solid var(--amarillo-400)", padding: "12px 16px",
          marginBottom: 28,
        }}>
          <div style={{
            fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 12,
            color: "var(--amarillo-700)", marginBottom: 6,
          }}>🧪 Tarjeta de prueba (sandbox)</div>
          <div style={{
            fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--ink-700)",
            display: "flex", flexDirection: "column", gap: 3,
          }}>
            <span><b>Número:</b> 4235 6477 2802 5682</span>
            <span><b>Vencimiento:</b> 11/25 &nbsp;&nbsp;<b>CVV:</b> 123</span>
            <span><b>Nombre:</b> APRO</span>
          </div>
        </div>

        {/* Formulario */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

          <Campo label="Correo electrónico" error={errores.email}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusField("email")}
              onBlur={() => setFocusField(null)}
              placeholder="tu@email.com"
              style={fieldStyle("email")}
            />
          </Campo>

          <Campo label="Nombre en la tarjeta" error={errores.nombre}>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value.toUpperCase())}
              onFocus={() => setFocusField("nombre")}
              onBlur={() => setFocusField(null)}
              placeholder="NOMBRE APELLIDO"
              style={fieldStyle("nombre")}
            />
          </Campo>

          <Campo label={`Número de tarjeta ${tarjeta ? `· ${cardBrand(tarjeta)}` : ""}`} error={errores.tarjeta}>
            <input
              type="text"
              inputMode="numeric"
              value={tarjeta}
              onChange={(e) => setTarjeta(formatCard(e.target.value))}
              onFocus={() => setFocusField("tarjeta")}
              onBlur={() => setFocusField(null)}
              placeholder="4235 6477 2802 5682"
              style={{ ...fieldStyle("tarjeta"), letterSpacing: "0.1em" }}
            />
          </Campo>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Campo label="Vencimiento" error={errores.expiry}>
              <input
                type="text"
                inputMode="numeric"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                onFocus={() => setFocusField("expiry")}
                onBlur={() => setFocusField(null)}
                placeholder="MM/AA"
                style={fieldStyle("expiry")}
              />
            </Campo>
            <Campo label="CVV" error={errores.cvv}>
              <input
                type="text"
                inputMode="numeric"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                onFocus={() => setFocusField("cvv")}
                onBlur={() => setFocusField(null)}
                placeholder="123"
                style={fieldStyle("cvv")}
              />
            </Campo>
          </div>

          {/* Botón pagar */}
          <button
            onClick={pagar}
            disabled={procesando}
            style={{
              marginTop: 8,
              height: 54, borderRadius: "var(--radius-full)",
              background: procesando ? "var(--ink-200)" : "var(--gradient-magic)",
              color: procesando ? "var(--ink-400)" : "#fff",
              fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 16,
              border: "none", cursor: procesando ? "not-allowed" : "pointer",
              boxShadow: procesando ? "none" : "var(--shadow-magic)",
              transition: "all 0.2s ease",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            {procesando ? (
              <>
                <span style={{
                  width: 18, height: 18, borderRadius: "50%",
                  border: "2px solid var(--ink-300)", borderTopColor: "transparent",
                  display: "inline-block",
                  animation: "spin 0.7s linear infinite",
                }} />
                Procesando...
              </>
            ) : (
              `Pagar $${precioTotal} →`
            )}
          </button>

          {/* Sellos de seguridad */}
          <div style={{
            display: "flex", justifyContent: "center", gap: 20,
            flexWrap: "wrap",
          }}>
            {["🔒 SSL seguro", "🏦 Mercado Pago", "✅ Garantía 100%"].map((s) => (
              <span key={s} style={{
                fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--text-subtle)",
              }}>{s}</span>
            ))}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
