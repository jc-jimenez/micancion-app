"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const LETRA = `[Verso 1]
En el momento que te vi llegar,
supe que el mundo iba a cambiar.
Tu sonrisa iluminó el lugar,
y el corazón empezó a volar.

[Coro]
Esta canción es para ti,
hecha con amor desde aquí.
Cada nota, cada compás,
te lleva a donde quieras ir.

[Verso 2]
Los años pasan pero tú y yo,
seguimos siendo lo mejor.
Como esa tarde que nos conoció
el destino con su mejor flor.

[Coro]
Esta canción es para ti,
hecha con amor desde aquí.
Cada nota, cada compás,
te lleva a donde quieras ir.

[Final]
Esta canción es para ti... 🎵`;

const DURACION = 187; // segundos mock

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function ResultadoPage() {
  const router = useRouter();
  const [reproduciendo, setReproduciendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [letraVisible, setLetraVisible] = useState(false);
  const [compartido, setCompartido] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function togglePlay() {
    if (reproduciendo) {
      clearInterval(intervalRef.current!);
      setReproduciendo(false);
    } else {
      setReproduciendo(true);
      intervalRef.current = setInterval(() => {
        setProgreso((p) => {
          if (p >= DURACION) {
            clearInterval(intervalRef.current!);
            setReproduciendo(false);
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    setProgreso(Math.round(pct * DURACION));
  }

  function compartir() {
    setCompartido(true);
    setTimeout(() => setCompartido(false), 2000);
  }

  const pct = (progreso / DURACION) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{
        flex: 1, maxWidth: 600, width: "100%", margin: "0 auto",
        padding: "40px 20px 80px",
        animation: "fade-up 0.5s ease both",
      }}>

        {/* Badge de éxito */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", marginBottom: 36,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "var(--gradient-magic)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 34, marginBottom: 16,
            boxShadow: "var(--shadow-magic)",
            animation: "pop 0.4s ease both",
          }}>🎵</div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(24px, 5vw, 34px)",
            color: "var(--text-strong)", marginBottom: 8, lineHeight: 1.2,
          }}>
            ¡Tu canción está lista!
          </h1>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 15,
            color: "var(--text-muted)", maxWidth: 380,
          }}>
            Creada especialmente para ti. Escúchala, descárgala y compártela.
          </p>
        </div>

        {/* ── Reproductor ── */}
        <div style={{
          background: "var(--gradient-night)",
          borderRadius: "var(--radius-xl)",
          padding: "28px 24px",
          marginBottom: 20,
          boxShadow: "0 12px 40px rgba(45,27,46,0.3)",
        }}>
          {/* Info canción */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "var(--radius-md)",
              background: "var(--gradient-magic)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, flexShrink: 0,
              boxShadow: "var(--shadow-magic)",
            }}>🎶</div>
            <div>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18,
                color: "#fff", marginBottom: 4,
              }}>Esta canción es para ti</div>
              <div style={{
                fontFamily: "var(--font-ui)", fontSize: 13,
                color: "rgba(255,255,255,0.5)",
              }}>Pop romántico · 3:07 · Voz femenina</div>
            </div>
          </div>

          {/* Ecualizador cuando suena */}
          {reproduciendo && (
            <div style={{
              display: "flex", alignItems: "flex-end", gap: 3,
              height: 24, marginBottom: 16,
            }}>
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, borderRadius: 2,
                  background: i % 3 === 0 ? "var(--magenta-400)" : i % 3 === 1 ? "var(--coral-400)" : "var(--teal-400)",
                  animation: `eq-bounce ${0.5 + Math.random() * 0.5}s ease ${i * 0.03}s infinite`,
                  height: `${30 + Math.floor(Math.random() * 70)}%`,
                }} />
              ))}
            </div>
          )}

          {/* Barra de progreso */}
          <div
            onClick={seek}
            style={{
              height: 4, borderRadius: "var(--radius-full)",
              background: "rgba(255,255,255,0.15)",
              cursor: "pointer", marginBottom: 8, position: "relative",
            }}
          >
            <div style={{
              height: "100%", width: `${pct}%`,
              background: "var(--gradient-magic)",
              borderRadius: "var(--radius-full)",
              transition: "width 0.5s linear",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", right: -5, top: "50%",
                transform: "translateY(-50%)",
                width: 12, height: 12, borderRadius: "50%",
                background: "#fff", boxShadow: "0 0 6px rgba(212,53,143,0.6)",
              }} />
            </div>
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between",
            fontFamily: "var(--font-ui)", fontSize: 11,
            color: "rgba(255,255,255,0.4)", marginBottom: 20,
          }}>
            <span>{formatTime(progreso)}</span>
            <span>{formatTime(DURACION)}</span>
          </div>

          {/* Controles */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
            <button
              onClick={() => setProgreso(Math.max(0, progreso - 15))}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 22, color: "rgba(255,255,255,0.6)",
              }}
            >⏮</button>

            <button
              onClick={togglePlay}
              style={{
                width: 58, height: 58, borderRadius: "50%",
                background: "var(--gradient-magic)",
                border: "none", cursor: "pointer",
                fontSize: 22, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "var(--shadow-magic)",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {reproduciendo ? "⏸" : "▶"}
            </button>

            <button
              onClick={() => setProgreso(Math.min(DURACION, progreso + 15))}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 22, color: "rgba(255,255,255,0.6)",
              }}
            >⏭</button>
          </div>
        </div>

        {/* ── Acciones ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <button style={{
            height: 48, borderRadius: "var(--radius-full)",
            background: "var(--gradient-magic)", color: "#fff",
            fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14,
            border: "none", cursor: "pointer",
            boxShadow: "var(--shadow-magic)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            ⬇️ Descargar MP3
          </button>

          <button
            onClick={compartir}
            style={{
              height: 48, borderRadius: "var(--radius-full)",
              background: compartido ? "var(--success-100)" : "var(--surface-card)",
              color: compartido ? "var(--success-600)" : "var(--text-body)",
              fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14,
              border: `1.5px solid ${compartido ? "var(--success-600)" : "var(--border-subtle)"}`,
              cursor: "pointer", transition: "all 0.2s ease",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            {compartido ? "✓ ¡Link copiado!" : "🔗 Compartir"}
          </button>
        </div>

        {/* ── Letra ── */}
        <div style={{
          background: "var(--surface-card)", borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-card)",
          overflow: "hidden", marginBottom: 24,
        }}>
          <button
            onClick={() => setLetraVisible(!letraVisible)}
            style={{
              all: "unset", cursor: "pointer", width: "100%",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px",
              fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14,
              color: "var(--text-strong)",
              borderBottom: letraVisible ? "1px solid var(--border-subtle)" : "none",
            }}
          >
            <span>📄 Ver letra completa</span>
            <span style={{ color: "var(--text-subtle)", fontSize: 18 }}>
              {letraVisible ? "−" : "+"}
            </span>
          </button>
          {letraVisible && (
            <pre style={{
              padding: "20px",
              fontFamily: "var(--font-body)", fontSize: 14,
              color: "var(--text-body)", lineHeight: 1.9,
              whiteSpace: "pre-wrap", wordBreak: "break-word",
              animation: "fade-up 0.2s ease both",
            }}>
              {LETRA}
            </pre>
          )}
        </div>

        {/* ── CTA crear otra ── */}
        <div style={{
          background: "var(--surface-info)", borderRadius: "var(--radius-xl)",
          border: "1px solid var(--magenta-100)", padding: "20px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16, flexWrap: "wrap",
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14,
              color: "var(--text-strong)", marginBottom: 4,
            }}>¿Quieres crear otra canción?</div>
            <div style={{
              fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)",
            }}>Cada historia merece su propia canción 🎵</div>
          </div>
          <button
            onClick={() => router.push("/crear")}
            style={{
              height: 40, padding: "0 20px", borderRadius: "var(--radius-full)",
              background: "var(--gradient-magic)", color: "#fff",
              fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13,
              border: "none", cursor: "pointer",
              boxShadow: "var(--shadow-magic)", whiteSpace: "nowrap",
            }}
          >
            Crear otra ✨
          </button>
        </div>
      </main>
    </div>
  );
}
