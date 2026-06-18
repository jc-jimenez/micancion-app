import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60; // segundos — requiere Vercel hobby o superior

// Voces disponibles por tipo
const VOCES: Record<string, string> = {
  Femenina: "EXAVITQu4vr4xnSDxMaL", // Sarah — multilingual, cálida
  Masculina: "pNInz6obpgDQGcFmaJgB", // Adam — multilingual, profunda
  Dueto:     "EXAVITQu4vr4xnSDxMaL", // Sarah por defecto
};

export async function POST(req: NextRequest) {
  try {
    const { letra, voz = "Femenina" } = await req.json();

    if (!letra) {
      return NextResponse.json({ error: "Letra requerida" }, { status: 400 });
    }

    // ElevenLabs free tier: max ~2500 chars
    const textoFinal = letra.length > 2500 ? letra.slice(0, 2500) : letra;
    console.log(`Generando audio: ${textoFinal.length} chars, voz: ${voz}`);

    const voiceId = VOCES[voz] ?? VOCES.Femenina;
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key no configurada" }, { status: 500 });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: textoFinal,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.4,
            similarity_boost: 0.8,
            style: 0.5,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("ElevenLabs error:", response.status, err);
      return NextResponse.json({ error: "Error generando audio", detail: err }, { status: 500 });
    }
    console.log("ElevenLabs OK, devolviendo audio");

    // Devolver el audio como stream
    const audioBuffer = await response.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Audio route error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
