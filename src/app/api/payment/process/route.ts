import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("MP process body:", JSON.stringify(body));
    const { email, ...formData } = body;

    const payment = new Payment(client);
    const result = await payment.create({
      body: {
        ...formData,
        payer: { email: email ?? formData.payer?.email ?? "" },
      },
    });

    console.log("MP payment result:", result.status, result.status_detail, result.id);
    return NextResponse.json({ status: result.status, status_detail: result.status_detail, id: result.id });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : JSON.stringify(error);
    console.error("MP process error:", msg);
    return NextResponse.json({ status: "error", status_detail: msg }, { status: 500 });
  }
}
