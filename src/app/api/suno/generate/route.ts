import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

const ESTILOS: Record<string, string> = {
  "Pop romántico": "romantic pop, catchy melody, emotional vocals, modern production",
  "Mariachi": "mariachi, trumpets, guitarron, vihuela, passionate mexican style",
  "Regional mexicano": "regional mexican, banda sinaloense, brass instruments, emotional",
  "Rock": "rock, electric guitar, drums, powerful vocals, energetic",
  "Cumbia": "cumbia, tropical, accordion, festive, upbeat rhythm",
  "Balada": "romantic ballad, piano, strings, soft emotional vocals",
  "Jazz": "jazz, saxophone, piano, double bass, smooth sophisticated vocals",
  "Ranchera": "ranchera, acoustic guitar, emotional mexican folk",
  "Default": "pop, upbeat, emotional, heartfelt vocals",
};

const TONOS: Record<string, string> = {
  "Emotivo": "emotional, heartfelt, touching",
  "Alegre": "happy, upbeat, joyful, celebratory",
  "Romántico": "romantic, loving, tender, passionate",
  "Intenso": "intense, powerful, dramatic",
  "Relajado": "relaxed, calm, peaceful, mellow",
};

export async function POST(req: NextRequest) {
  try {
    const { letra, estilo = "Default", tono = "", titulo = "Mi Canción" } = await req.json();

    if (!letra) return NextResponse.json({ error: "Letra requerida" }, { status: 400 });

    const apiKey = process.env.SUNO_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "API key no configurada" }, { status: 500 });

    const styleBase = ESTILOS[estilo] ?? ESTILOS.Default;
    const toneTag = TONOS[tono] ?? "";
    const style = toneTag ? `${styleBase}, ${toneTag}` : styleBase;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://micancion-app.vercel.app";

    console.log(`Generando con Suno: estilo="${style}", letra=${letra.length} chars`);

    const res = await fetch("https://api.sunoapi.org/api/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: letra,
        style,
        title: titulo,
        customMode: true,
        instrumental: false,
        model: "V4",
        callBackUrl: `${baseUrl}/api/suno/callback`,
      }),
    });

    const data = await res.json();
    console.log("Suno generate response:", JSON.stringify(data));

    if (data.code !== 200) {
      return NextResponse.json({ error: data.msg ?? "Error generando canción" }, { status: 500 });
    }

    return NextResponse.json({ taskId: data.data.taskId });
  } catch (error) {
    console.error("Suno generate error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
