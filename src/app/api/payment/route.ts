import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { total, desc, email } = await req.json();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            id: "micancion-ia",
            title: desc ?? "Canción IA personalizada",
            quantity: 1,
            unit_price: total ?? 39,
            currency_id: "MXN",
          },
        ],
        payer: { email: email ?? "" },
        back_urls: {
          success: `${baseUrl}/generando`,
          failure: `${baseUrl}/pago?error=1`,
          pending: `${baseUrl}/generando`,
        },
        auto_return: "approved",
        statement_descriptor: "MiCancion.app",
      },
    });

    return NextResponse.json({ id: result.id, init_point: result.init_point, sandbox_init_point: result.sandbox_init_point });
  } catch (error) {
    console.error("MP error:", error);
    return NextResponse.json({ error: "Error creando preferencia" }, { status: 500 });
  }
}
