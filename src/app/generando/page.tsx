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

const DURACION_TOTAL = 6000; // ms
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
      minHeight: "100vh",
      background: "var(--gradient-night)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 20px",
    }}>

      {/* Logo */}
      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22,
        background: "var(--gradient-magic)", WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent", marginBottom: 48,
        letterSpacing: "-0.5px",
      }}>
        MiCancion.app
      </div>

      {/* Ecualizador animado */}
      <div style={{
        display: "flex", alignItems: "flex-end", gap: 5,
        height: 60, marginBottom: 40,
      }}>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <div key={n} style={{
            width: 8, borderRadius: 4,
            background: n % 2 === 0 ? "var(--magenta-500)" : "var(--coral-500)",
            animation: `eq-bounce 0.8s ease ${n * 0.1}s infinite`,
            height: `${20 + Math.random() * 40}px`,
          }} />
        ))}
      </div>

      {/* Título */}
      <h1 style={{
        fontFamily: "var(--font-display)", fontWeight: 800,
        fontSize: "clamp(24px, 5vw, 36px)",
        color: "#fff", textAlign: "center",
        marginBottom: 12, lineHeight: 1.2,
      }}>
        Creando tu canción
      </h1>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 15,
        color: "rgba(255,255,255,0.6)", textAlign: "center",
        marginBottom: 48,
      }}>
        La magia está en proceso ✨ Esto toma ~3 minutos
      </p>

      {/* Barra de progreso */}
      <div style={{
        width: "100%", maxWidth: 400,
        height: 8, borderRadius: "var(--radius-full)",
        background: "rgba(255,255,255,0.12)",
        marginBottom: 12, overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${progreso}%`,
          background: "var(--gradient-magic)",
          borderRadius: "var(--radius-full)",
          transition: "width 0.1s linear",
          boxShadow: "0 0 12px rgba(212,53,143,0.6)",
        }} />
      </div>

      <div style={{
        fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13,
        color: "rgba(255,255,255,0.5)", marginBottom: 40,
      }}>
        {Math.round(progreso)}%
      </div>

      {/* Lista de pasos */}
      <div style={{
        display: "flex", flexDirection: "column", gap: 12,
        width: "100%", maxWidth: 360,
      }}>
        {PASOS.map((p, i) => {
          const completado = i < pasoActual;
          const activo = i === pasoActual;
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              opacity: completado || activo ? 1 : 0.3,
              transition: "opacity 0.4s ease",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                background: completado
                  ? "var(--gradient-magic)"
                  : activo
                  ? "rgba(212,53,143,0.25)"
                  : "rgba(255,255,255,0.08)",
                border: activo ? "1.5px solid var(--magenta-500)" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: completado ? 14 : 16,
                transition: "all 0.3s ease",
                boxShadow: activo ? "0 0 12px rgba(212,53,143,0.4)" : "none",
              }}>
                {completado ? "✓" : p.emoji}
              </div>
              <span style={{
                fontFamily: "var(--font-ui)", fontWeight: activo ? 700 : 500,
                fontSize: 14,
                color: completado
                  ? "rgba(255,255,255,0.9)"
                  : activo
                  ? "#fff"
                  : "rgba(255,255,255,0.4)",
                transition: "all 0.3s ease",
              }}>
                {p.texto}
              </span>
              {activo && (
                <div style={{
                  marginLeft: "auto", display: "flex", gap: 3, alignItems: "center",
                }}>
                  {[0, 1, 2].map((n) => (
                    <div key={n} style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: "var(--magenta-400)",
                      animation: `eq-bounce 0.7s ease ${n * 0.15}s infinite`,
                    }} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mensaje de fondo */}
      <p style={{
        marginTop: 48, fontFamily: "var(--font-body)", fontSize: 13,
        color: "rgba(255,255,255,0.3)", textAlign: "center", maxWidth: 300,
      }}>
        No cierres esta ventana. Te avisamos cuando tu canción esté lista.
      </p>
    </div>
  );
}
