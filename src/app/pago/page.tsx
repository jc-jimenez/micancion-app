"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function PagoContenido() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const errorDetail = searchParams.get("detail");

  const [email, setEmail] = useState("");
  const [emailOk, setEmailOk] = useState(false);
  const [cargandoMP, setCargandoMP] = useState(false);
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

  async function iniciarPago() {
    if (!email.includes("@")) return;
    setCargandoMP(true);

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total: precioTotal, desc: configDesc, email }),
      });
      const data = await res.json();
      const url = data.sandbox_init_point ?? data.init_point;
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("Sin URL de pago");
      }
    } catch (err) {
      console.error(err);
      setCargandoMP(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0D0A14", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@400;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fade-up { from{transform:translateY(12px);opacity:0} to{transform:translateY(0);opacity:1} }
        ::placeholder { color: rgba(255,255,255,0.3); }
        #mp-brick-container iframe { border-radius: 16px !important; }
      `}</style>


      {/* Blobs */}
      <div style={{ position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,53,143,0.1) 0%,transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(13,10,20,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎵</div>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>MiCanción</span>
        </Link>
        <div style={{ height: 4, width: 160, borderRadius: 100, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: "85%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", borderRadius: 100 }} />
        </div>
      </nav>

      <main style={{ position: "relative", zIndex: 1, maxWidth: 500, width: "100%", margin: "0 auto", padding: "40px 24px 80px", animation: "fade-up 0.4s ease both" }}>

        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(24px,4vw,32px)", color: "#fff", marginBottom: 6 }}>
          Pago seguro 🔒
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 32 }}>
          Procesado por Mercado Pago · SSL 256-bit
        </p>

        {/* Error banner */}
        {errorParam && (
          <div style={{ background: "rgba(255,107,74,0.1)", border: "1px solid rgba(255,107,74,0.3)", borderRadius: 12, padding: "12px 16px", marginBottom: 24, color: "#FF6B4A", fontSize: 14, fontWeight: 600 }}>
            ⚠️ El pago no se completó. Intenta de nuevo. {errorDetail && <span style={{opacity:0.7}}>({errorDetail})</span>}
          </div>
        )}

        {/* Resumen del pedido */}
        <div style={{ background: "rgba(212,53,143,0.08)", border: "1px solid rgba(212,53,143,0.2)", borderRadius: 16, padding: "18px 20px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>🎵 {configDesc}</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>Entrega inmediata · Descarga MP3</div>
          </div>
          <div>
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 30, color: "#D4358F" }}>${precioTotal}</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginLeft: 4 }}>MXN</span>
          </div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Correo electrónico
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailOk(e.target.value.includes("@")); }}
                placeholder="tu@email.com"
                style={{ flex: 1, height: 50, padding: "0 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 15, outline: "none", fontFamily: "'Nunito', sans-serif" }}
                onKeyDown={(e) => { if (e.key === "Enter" && emailOk) iniciarPago(); }}
              />
              <button
                onClick={iniciarPago}
                disabled={!emailOk || cargandoMP}
                style={{ height: 50, padding: "0 20px", borderRadius: 12, background: emailOk && !cargandoMP ? "linear-gradient(135deg,#D4358F,#FF6B4A)" : "rgba(255,255,255,0.06)", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: emailOk && !cargandoMP ? "pointer" : "not-allowed", whiteSpace: "nowrap", boxShadow: emailOk ? "0 4px 16px rgba(212,53,143,0.4)" : "none", transition: "all 0.2s" }}
              >
                {cargandoMP ? (
                  <span style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)", borderTopColor: "#fff", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                ) : "Continuar →"}
              </button>
            </div>
          </div>

        {/* Modo prueba */}
        <div style={{ textAlign: "center", marginTop: 16, marginBottom: 8 }}>
          <button
            onClick={() => { window.location.href = "/generando"; }}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.2)", fontSize: 12, cursor: "pointer", textDecoration: "underline" }}
          >
            [Modo prueba: saltar pago]
          </button>
        </div>

        {/* Sellos */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
          {["🔒 SSL seguro", "🏦 Mercado Pago", "✅ Garantía 100%"].map(s => (
            <span key={s} style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>{s}</span>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function PagoPage() {
  return (
    <Suspense>
      <PagoContenido />
    </Suspense>
  );
}
