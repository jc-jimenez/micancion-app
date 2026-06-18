import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

const ESTILOS: Record<string, string> = {
  "Pop romántico": "romantic pop ballad, emotional vocals",
  "Mariachi": "traditional mariachi, trumpets, guitarron, emotional",
  "Regional mexicano": "regional mexican, banda, emotional",
  "Rock": "rock, electric guitar, powerful vocals",
  "Cumbia": "cumbia, tropical, festive",
  "Balada": "slow ballad, piano, emotional vocals",
  "Jazz": "jazz, saxophone, smooth vocals",
  "Default": "pop, emotional, heartfelt vocals",
};

export async function POST(req: NextRequest) {
  try {
    const { letra, estilo = "Default", titulo = "Mi Canción" } = await req.json();

    if (!letra) return NextResponse.json({ error: "Letra requerida" }, { status: 400 });

    const apiKey = process.env.SUNO_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "API key no configurada" }, { status: 500 });

    const style = ESTILOS[estilo] ?? ESTILOS.Default;
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
