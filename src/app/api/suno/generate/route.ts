import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

const ESTILOS: Record<string, string> = {
  "Mariachi":  "mariachi, trumpets, guitarron, vihuela, mexican mariachi",
  "Corrido":   "corrido mexicano, acoustic guitar, accordion, norteño storytelling",
  "Banda":     "banda sinaloense, tubas, clarinets, brass, mexican banda",
  "Norteño":   "norteño, accordion, bajo sexto, mexican folk",
  "Ranchera":  "ranchera, acoustic guitar, emotional mexican folk",
  "Balada":    "romantic ballad, piano, strings, soft vocals",
  "Pop":       "pop, modern production, catchy melody",
  "Cumbia":    "cumbia, accordion, tropical, festive rhythm",
  "Urbano":    "reggaeton, urban latin, trap, modern beats",
  "Góspel":    "gospel, choir, uplifting, spiritual, piano",
  "Tropical":  "salsa, tropical, brass, percussion",
  "Reggaeton": "reggaeton, perreo, urban beats, 808",
};

const TONOS: Record<string, string> = {
  "Emotivo":   "emotional, heartfelt",
  "Alegre":    "happy, joyful, upbeat",
  "Romántico": "romantic, tender, loving",
  "Intenso":   "intense, powerful, dramatic",
  "Relajado":  "relaxed, calm, mellow",
  "Con humor": "playful, fun, lighthearted",
  "Poético":   "poetic, lyrical, beautiful",
};

export async function POST(req: NextRequest) {
  try {
    const { letra, estilos = [], instrumentos = [], tono = "", titulo = "Mi Canción", extras = {} } = await req.json();

    if (!letra) return NextResponse.json({ error: "Letra requerida" }, { status: 400 });

    const apiKey = process.env.SUNO_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "API key no configurada" }, { status: 500 });

    // Construir style prompt
    const estiloTags = estilos.length > 0
      ? estilos.map((e: string) => ESTILOS[e] ?? e.toLowerCase()).join(", ")
      : "pop, emotional";
    const instrumentoTags = instrumentos.length > 0
      ? instrumentos.map((i: string) => i.toLowerCase()).join(", ")
      : "";
    const toneTag = TONOS[tono] ?? "";
    const extraTags: string[] = [];
    if (extras.coro_doble)      extraTags.push("double chorus, harmonies");
    if (extras.bridge)          extraTags.push("emotional bridge section");
    if (extras.intro_piano)     extraTags.push("solo piano intro");
    if (extras.final_dramatico) extraTags.push("dramatic orchestral ending, crescendo");

    const style = [estiloTags, instrumentoTags, toneTag, ...extraTags].filter(Boolean).join(", ");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://micancion-app.vercel.app";

    console.log(`Suno style: "${style}"`);
    console.log(`Suno letra: ${letra.length} chars`);

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
    console.log("Suno response:", JSON.stringify(data));

    if (data.code !== 200) {
      return NextResponse.json({ error: data.msg ?? "Error generando canción" }, { status: 500 });
    }

    return NextResponse.json({ taskId: data.data.taskId });
  } catch (error) {
    console.error("Suno generate error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
