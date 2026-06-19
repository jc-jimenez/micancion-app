"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DURACION = 187;

function formatTime(s: number) {
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}

function Stars() {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={16} height={16} viewBox="0 0 24 24" fill="#FFB800">
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.9 6.2 20.9l1.1-6.45-4.7-4.6 6.5-.95L12 2.5Z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ResultadoPage() {
  const router = useRouter();
  const [reproduciendo, setReproduciendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [duracion, setDuracion] = useState(DURACION);
  const [letraVisible, setLetraVisible] = useState(false);
  const [compartido, setCompartido] = useState(false);
  const [letra, setLetra] = useState("");
  const [tieneAudio, setTieneAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const savedLetra = localStorage.getItem("micancion_letra");
    if (savedLetra) setLetra(savedLetra);

    const duracionGuardada = localStorage.getItem("micancion_duracion");
    if (duracionGuardada) setDuracion(Math.floor(Number(duracionGuardada)));

    // Audio URL de Suno guardada en localStorage
    const audioUrl = localStorage.getItem("micancion_audio_url");
    if (audioUrl) cargarAudio(audioUrl);

    return () => {
      audioRef.current?.pause();
      clearInterval(intervalRef.current!);
    };
  }, []);

  function togglePlay() {
    if (tieneAudio && audioRef.current) {
      if (reproduciendo) {
        audioRef.current.pause();
        setReproduciendo(false);
      } else {
        audioRef.current.play();
        setReproduciendo(true);
      }
    } else {
      // Simulación si no hay audio real
      if (reproduciendo) {
        clearInterval(intervalRef.current!);
        setReproduciendo(false);
      } else {
        setReproduciendo(true);
        intervalRef.current = setInterval(() => {
          setProgreso((p) => {
            if (p >= duracion) { clearInterval(intervalRef.current!); setReproduciendo(false); return 0; }
            return p + 1;
          });
        }, 1000);
      }
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const newTime = Math.round(((e.clientX - rect.left) / rect.width) * duracion);
    setProgreso(newTime);
    if (tieneAudio && audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  }

  function cargarAudio(base64: string) {
    const audio = new Audio(base64);
    audio.addEventListener("loadedmetadata", () => setDuracion(Math.floor(audio.duration)));
    audio.addEventListener("ended", () => { setReproduciendo(false); setProgreso(0); });
    audio.addEventListener("timeupdate", () => setProgreso(Math.floor(audio.currentTime)));
    audioRef.current = audio;
    setTieneAudio(true);
  }

  async function descargar() {
    const audioUrl = localStorage.getItem("micancion_audio_url");
    if (!audioUrl) { alert("El audio aún no está listo."); return; }
    try {
      const res = await fetch(audioUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mi-cancion.mp3";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch {
      // Fallback si CORS bloquea el fetch
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = "mi-cancion.mp3";
      a.click();
    }
  }

  function compartir() {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setCompartido(true);
    setTimeout(() => setCompartido(false), 2000);
  }

  const pct = (progreso / duracion) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "#0D0A14", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@400;600;700&display=swap');
        @keyframes eq-bounce { 0%,100%{transform:scaleY(0.3)} 50%{transform:scaleY(1)} }
        @keyframes pop { from{transform:scale(0.8);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes fade-up { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }
      `}</style>

      {/* Blobs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "20%", width: 500, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,53,143,0.12) 0%,transparent 70%)", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(25,195,201,0.1) 0%,transparent 70%)", filter: "blur(50px)" }} />
      </div>

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(13,10,20,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎵</div>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>MiCanción</span>
        </Link>
        <Stars />
      </nav>

      <main style={{ position: "relative", zIndex: 1, maxWidth: 600, width: "100%", margin: "0 auto", padding: "48px 24px 80px", animation: "fade-up 0.5s ease both" }}>

        {/* Header éxito */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, marginBottom: 20, boxShadow: "0 8px 40px rgba(212,53,143,0.5)", animation: "pop 0.4s ease both" }}>🎵</div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(26px,5vw,36px)", color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>
            {tieneAudio ? "¡Tu canción está lista!" : "Procesando tu canción..."}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, maxWidth: 380 }}>
            {tieneAudio ? "Creada especialmente para ti. Escúchala, descárgala y compártela." : "Hubo un problema con la generación. Puedes reintentar abajo."}
          </p>
        </div>

        {/* Reproductor */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "28px 24px", marginBottom: 16 }}>

          {/* Info canción */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 60, height: 60, borderRadius: 14, background: "linear-gradient(135deg,#D4358F,#FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, boxShadow: "0 4px 20px rgba(212,53,143,0.4)" }}>🎶</div>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 4 }}>Tu canción personalizada</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{tieneAudio ? "🎵 Audio real · " : "📄 "}Composición única · {formatTime(duracion)}</div>
            </div>
          </div>

          {/* Error: Suno no generó audio */}
          {!tieneAudio && (
            <div style={{ marginBottom: 20, padding: "16px", borderRadius: 12, background: "rgba(255,100,100,0.08)", border: "1px solid rgba(255,100,100,0.2)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ color: "#ff6b6b", fontWeight: 700, fontSize: 13 }}>⚠️ Error generando la canción</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 2 }}>Suno AI no pudo completar la generación.</div>
              </div>
              <button
                onClick={() => window.location.href = "/generando"}
                style={{ height: 38, padding: "0 18px", borderRadius: 100, background: "rgba(255,107,107,0.2)", color: "#ff6b6b", fontWeight: 700, fontSize: 13, border: "1px solid rgba(255,107,107,0.4)", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Ecualizador */}
          {reproduciendo && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 28, marginBottom: 16 }}>
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} style={{ flex: 1, borderRadius: 2, background: i % 3 === 0 ? "#D4358F" : i % 3 === 1 ? "#FF6B4A" : "#19C3C9", animation: `eq-bounce ${0.4 + (i % 5) * 0.1}s ease ${i * 0.03}s infinite`, height: `${30 + (i * 7) % 70}%`, transformOrigin: "bottom" }} />
              ))}
            </div>
          )}

          {/* Barra seek */}
          <div onClick={seek} style={{ height: 4, borderRadius: 100, background: "rgba(255,255,255,0.1)", cursor: "pointer", marginBottom: 8, position: "relative" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(135deg,#D4358F,#FF6B4A)", borderRadius: 100, transition: "width 0.5s linear", position: "relative" }}>
              <div style={{ position: "absolute", right: -6, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, borderRadius: "50%", background: "#fff", boxShadow: "0 0 8px rgba(212,53,143,0.8)" }} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.3)", fontSize: 12, marginBottom: 24 }}>
            <span>{formatTime(progreso)}</span>
            <span>{formatTime(duracion)}</span>
          </div>

          {/* Controles */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>
            <button onClick={() => setProgreso(Math.max(0, progreso - 15))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: "rgba(255,255,255,0.5)" }}>⏮</button>
            <button onClick={togglePlay} style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#D4358F,#FF6B4A)", border: "none", cursor: "pointer", fontSize: 26, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(212,53,143,0.5)", transition: "transform 0.15s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              {reproduciendo ? "⏸" : "▶"}
            </button>
            <button onClick={() => setProgreso(Math.min(DURACION, progreso + 15))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: "rgba(255,255,255,0.5)" }}>⏭</button>
          </div>
        </div>

        {/* Acciones */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <button onClick={descargar} disabled={!letra} style={{ height: 50, borderRadius: 100, background: letra ? "linear-gradient(135deg,#D4358F,#FF6B4A)" : "rgba(255,255,255,0.06)", color: "#fff", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: letra ? "pointer" : "not-allowed", boxShadow: letra ? "0 4px 20px rgba(212,53,143,0.4)" : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            ⬇️ Descargar MP3
          </button>
          <button onClick={compartir} style={{ height: 50, borderRadius: 100, background: compartido ? "rgba(25,195,201,0.15)" : "rgba(255,255,255,0.06)", color: compartido ? "#19C3C9" : "#fff", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, border: `1px solid ${compartido ? "#19C3C9" : "rgba(255,255,255,0.12)"}`, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            {compartido ? "✓ ¡Link copiado!" : "🔗 Compartir"}
          </button>
        </div>

        {/* Letra */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden", marginBottom: 20 }}>
          <button onClick={() => setLetraVisible(!letraVisible)} style={{ all: "unset", cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", color: "#fff", fontWeight: 700, fontSize: 15, borderBottom: letraVisible ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
            <span>📄 Ver letra completa</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }}>{letraVisible ? "−" : "+"}</span>
          </button>
          {letraVisible && (
            <pre style={{ padding: "20px 22px", fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 2, whiteSpace: "pre-wrap", wordBreak: "break-word", animation: "fade-up 0.2s ease both" }}>
              {letra || "Cargando letra..."}
            </pre>
          )}
        </div>

        {/* CTA crear otra */}
        <div style={{ background: "rgba(212,53,143,0.08)", border: "1px solid rgba(212,53,143,0.2)", borderRadius: 20, padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>¿Quieres crear otra canción?</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>Cada historia merece su propia canción 🎵</div>
          </div>
          <button onClick={() => router.push("/crear")} style={{ height: 42, padding: "0 22px", borderRadius: 100, background: "linear-gradient(135deg,#D4358F,#FF6B4A)", color: "#fff", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(212,53,143,0.4)", whiteSpace: "nowrap" }}>
            Crear otra ✨
          </button>
        </div>
      </main>
    </div>
  );
}
