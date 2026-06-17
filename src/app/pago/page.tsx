"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function formatCard(val: string) {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(val: string) {
  const d = val.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}
function cardBrand(num: string) {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^5[1-5]/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "Amex";
  return "";
}

const inputStyle: React.CSSProperties = {
  height: 50, padding: "0 16px", width: "100%",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.06)",
  fontFamily: "'Nunito', sans-serif", fontSize: 15,
  color: "#fff", outline: "none",
  transition: "border-color 0.2s",
};

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
  const [precioTotal, setPrecioTotal] = useState(39);
  const [configDesc, setConfigDesc] = useState("Canción IA personalizada");

  useEffect(() => {
    const raw = localStorage.getItem("micancion_pedido");
    if (raw) {
      const pedido = JSON.parse(raw);
      if (pedido.total) setPrecioTotal(pedido.total);
      if (pedido.desc) setConfigDesc(pedido.desc);
    }
  }, []);

  function validar() {
    const e: Record<string, string> = {};
    if (!nombre.trim()) e.nombre = "Ingresa el nombre del titular";
    if (tarjeta.replace(/\s/g, "").length < 16) e.tarjeta = "Número inválido";
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
    borderColor: errores[field] ? "#FF6B4A" : focusField === field ? "#D4358F" : "rgba(255,255,255,0.12)",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0D0A14", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@400;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        ::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>

      {/* Blob */}
      <div style={{ position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)", width: 500, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,53,143,0.1) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(13,10,20,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎵</div>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>MiCanción</span>
        </Link>
        <div style={{ height: 4, width: 160, borderRadius: 100, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: "85%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", borderRadius: 100 }} />
        </div>
      </nav>

      <main style={{ position: "relative", zIndex: 1, maxWidth: 480, width: "100%", margin: "0 auto", padding: "40px 24px 80px" }}>

        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(24px,4vw,32px)", color: "#fff", marginBottom: 6 }}>Pago seguro 🔒</h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 32 }}>Entorno sandbox — usa la tarjeta de prueba abajo.</p>

        {/* Resumen */}
        <div style={{ background: "rgba(212,53,143,0.08)", border: "1px solid rgba(212,53,143,0.25)", borderRadius: 16, padding: "18px 20px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>🎵 {configDesc}</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 4 }}>Entrega inmediata · Descarga MP3</div>
          </div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 28, color: "#D4358F" }}>${precioTotal}</div>
        </div>

        {/* Tarjeta de prueba */}
        <div style={{ background: "rgba(255,183,0,0.08)", border: "1px solid rgba(255,183,0,0.3)", borderRadius: 12, padding: "12px 16px", marginBottom: 28 }}>
          <div style={{ color: "#FFB700", fontWeight: 700, fontSize: 12, marginBottom: 6 }}>🧪 Tarjeta de prueba (sandbox)</div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, display: "flex", flexDirection: "column", gap: 3 }}>
            <span><b style={{ color: "#fff" }}>Número:</b> 4235 6477 2802 5682</span>
            <span><b style={{ color: "#fff" }}>Vencimiento:</b> 11/25 &nbsp;<b style={{ color: "#fff" }}>CVV:</b> 123 &nbsp;<b style={{ color: "#fff" }}>Nombre:</b> APRO</span>
          </div>
        </div>

        {/* Formulario */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {[
            { label: "Correo electrónico", field: "email", type: "email", placeholder: "tu@email.com", value: email, set: setEmail },
            { label: "Nombre en la tarjeta", field: "nombre", type: "text", placeholder: "NOMBRE APELLIDO", value: nombre, set: (v: string) => setNombre(v.toUpperCase()) },
          ].map(({ label, field, type, placeholder, value, set }) => (
            <div key={field}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
              <input type={type} value={value} onChange={(e) => set(e.target.value)} onFocus={() => setFocusField(field)} onBlur={() => setFocusField(null)} placeholder={placeholder} style={fieldStyle(field)} />
              {errores[field] && <span style={{ color: "#FF6B4A", fontSize: 12, marginTop: 4, display: "block" }}>{errores[field]}</span>}
            </div>
          ))}

          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Número de tarjeta {cardBrand(tarjeta) && <span style={{ color: "#D4358F" }}>· {cardBrand(tarjeta)}</span>}
            </label>
            <input type="text" inputMode="numeric" value={tarjeta} onChange={(e) => setTarjeta(formatCard(e.target.value))} onFocus={() => setFocusField("tarjeta")} onBlur={() => setFocusField(null)} placeholder="4235 6477 2802 5682" style={{ ...fieldStyle("tarjeta"), letterSpacing: "0.12em" }} />
            {errores.tarjeta && <span style={{ color: "#FF6B4A", fontSize: 12, marginTop: 4, display: "block" }}>{errores.tarjeta}</span>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Vencimiento</label>
              <input type="text" inputMode="numeric" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} onFocus={() => setFocusField("expiry")} onBlur={() => setFocusField(null)} placeholder="MM/AA" style={fieldStyle("expiry")} />
              {errores.expiry && <span style={{ color: "#FF6B4A", fontSize: 12 }}>{errores.expiry}</span>}
            </div>
            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>CVV</label>
              <input type="text" inputMode="numeric" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} onFocus={() => setFocusField("cvv")} onBlur={() => setFocusField(null)} placeholder="123" style={fieldStyle("cvv")} />
              {errores.cvv && <span style={{ color: "#FF6B4A", fontSize: 12 }}>{errores.cvv}</span>}
            </div>
          </div>

          <button onClick={pagar} disabled={procesando} style={{ marginTop: 8, height: 54, borderRadius: 100, background: procesando ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg,#D4358F,#FF6B4A)", color: procesando ? "rgba(255,255,255,0.4)" : "#fff", fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 17, border: "none", cursor: procesando ? "not-allowed" : "pointer", boxShadow: procesando ? "none" : "0 8px 32px rgba(212,53,143,0.4)", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            {procesando ? (
              <><span style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)", borderTopColor: "#fff", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Procesando...</>
            ) : `Pagar $${precioTotal} MXN →`}
          </button>

          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {["🔒 SSL seguro", "🏦 Mercado Pago", "✅ Garantía 100%"].map(s => (
              <span key={s} style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>{s}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
