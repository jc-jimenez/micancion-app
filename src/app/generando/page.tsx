"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PASOS = [
  { emoji: "🧠", texto: "Analizando tu historia..." },
  { emoji: "✍️", texto: "Escribiendo la letra..." },
  { emoji: "🎼", texto: "Componiendo la melodía..." },
  { emoji: "🎤", texto: "Grabando la voz..." },
  { emoji: "🎚️", texto: "Mezclando y masterizando..." },
  { emoji: "✨", texto: "¡Últimos toques mágicos!" },
];

const DURACION_TOTAL = 6000;
const INTERVALO_PASO = DURACION_TOTAL / PASOS.length;

export default function GenerandoPage() {
  const router = useRouter();
  const [pasoActual, setPasoActual] = useState(0);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    const inicio = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - inicio;
      const pct = Math.min((elapsed / DURACION_TOTAL) * 100, 100);
      setProgreso(pct);
      setPasoActual(Math.min(Math.floor(elapsed / INTERVALO_PASO), PASOS.length - 1));
      if (elapsed >= DURACION_TOTAL) {
        clearInterval(interval);
        setTimeout(() => router.push("/resultado"), 400);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div style={{
      minHeight: "100vh", background: "#0D0A14",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", fontFamily: "'Nunito', sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@400;600;700&display=swap');
        @keyframes eq-bounce { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1)} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 30px rgba(212,53,143,0.4)} 50%{box-shadow:0 0 60px rgba(212,53,143,0.7)} }
      `}</style>

      {/* Blobs */}
      <div style={{ position: "absolute", top: "20%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,53,143,0.15) 0%,transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(25,195,201,0.12) 0%,transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 56 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎵</div>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: "#fff" }}>MiCanción</span>
        </div>

        {/* Ecualizador */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 56, marginBottom: 40 }}>
          {[1,2,3,4,5,6,7,8,9].map((n) => (
            <div key={n} style={{
              width: 7, borderRadius: 4,
              background: n % 3 === 0 ? "#D4358F" : n % 3 === 1 ? "#FF6B4A" : "#19C3C9",
              animation: `eq-bounce ${0.6 + (n * 0.07)}s ease ${n * 0.08}s infinite`,
              height: `${25 + (n * 4) % 35}px`,
              transformOrigin: "bottom",
            }} />
          ))}
        </div>

        {/* Título */}
        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(26px,5vw,36px)", color: "#fff", textAlign: "center", marginBottom: 10, lineHeight: 1.2 }}>
          Creando tu canción
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, textAlign: "center", marginBottom: 48 }}>
          La magia está en proceso ✨
        </p>

        {/* Barra de progreso */}
        <div style={{ width: "100%", height: 6, borderRadius: 100, background: "rgba(255,255,255,0.08)", marginBottom: 10, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${progreso}%`,
            background: "linear-gradient(135deg,#D4358F,#FF6B4A)",
            borderRadius: 100, transition: "width 0.1s linear",
            boxShadow: "0 0 12px rgba(212,53,143,0.6)",
          }} />
        </div>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, fontWeight: 700, marginBottom: 44 }}>{Math.round(progreso)}%</div>

        {/* Pasos */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
          {PASOS.map((p, i) => {
            const completado = i < pasoActual;
            const activo = i === pasoActual;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, opacity: completado || activo ? 1 : 0.25, transition: "opacity 0.4s ease" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: completado ? "linear-gradient(135deg,#D4358F,#FF6B4A)" : activo ? "rgba(212,53,143,0.2)" : "rgba(255,255,255,0.05)",
                  border: activo ? "1.5px solid #D4358F" : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: completado ? 14 : 18, transition: "all 0.3s ease",
                  animation: activo ? "pulse-glow 1.5s ease infinite" : "none",
                }}>
                  {completado ? "✓" : p.emoji}
                </div>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: activo ? 700 : 500, fontSize: 14, color: completado ? "rgba(255,255,255,0.9)" : activo ? "#fff" : "rgba(255,255,255,0.4)", transition: "all 0.3s ease" }}>
                  {p.texto}
                </span>
                {activo && (
                  <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                    {[0,1,2].map(n => (
                      <div key={n} style={{ width: 5, height: 5, borderRadius: "50%", background: "#D4358F", animation: `eq-bounce 0.7s ease ${n * 0.15}s infinite` }} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p style={{ marginTop: 48, color: "rgba(255,255,255,0.2)", fontSize: 12, textAlign: "center" }}>
          No cierres esta ventana mientras creamos tu canción
        </p>
      </div>
    </div>
  );
}
