import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function GET(req: NextRequest) {
  const taskId = req.nextUrl.searchParams.get("taskId");
  if (!taskId) return NextResponse.json({ error: "taskId requerido" }, { status: 400 });

  const apiKey = process.env.SUNO_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "API key no configurada" }, { status: 500 });

  try {
    const res = await fetch(
      `https://api.sunoapi.org/api/v1/generate/record-info?taskId=${taskId}`,
      { headers: { "Authorization": `Bearer ${apiKey}` } }
    );

    const data = await res.json();
    const task = data.data;

    if (!task) return NextResponse.json({ status: "PENDING" });

    if (task.status === "SUCCESS" || task.status === "FIRST_SUCCESS") {
      const sunoData = task.response?.sunoData;
      const audioUrl = sunoData?.[0]?.audioUrl ?? null;
      const imageUrl = sunoData?.[0]?.imageUrl ?? null;
      const title = sunoData?.[0]?.title ?? "Mi Canción";
      const duration = sunoData?.[0]?.duration ?? null;
      return NextResponse.json({ status: "SUCCESS", audioUrl, imageUrl, title, duration });
    }

    if (task.status === "SENSITIVE_WORD_ERROR" || task.errorCode) {
      return NextResponse.json({ status: "ERROR", error: task.errorMessage });
    }

    return NextResponse.json({ status: task.status ?? "PENDING" });
  } catch (error) {
    console.error("Suno status error:", error);
    return NextResponse.json({ status: "ERROR", error: "Error consultando estado" });
  }
}
