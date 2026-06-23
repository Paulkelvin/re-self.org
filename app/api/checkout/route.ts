import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  packageTitle: z.string().min(1),
  priceAmount: z.number().int().positive(),
  squareItemId: z.string().optional().default(""),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { packageTitle, priceAmount, squareItemId } = parsed.data;
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;

  if (!accessToken || !locationId) {
    return NextResponse.json(
      { error: "Payment configuration missing" },
      { status: 500 },
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://re-self.org";

  const checkoutBody = {
    idempotency_key: crypto.randomUUID(),
    order: {
      order: {
        location_id: locationId,
        line_items: [
          {
            name: packageTitle,
            quantity: "1",
            base_price_money: {
              amount: priceAmount,
              currency: "USD",
            },
            ...(squareItemId ? { catalog_object_id: squareItemId } : {}),
          },
        ],
      },
    },
    redirect_url: `${baseUrl}/packages/success`,
    pre_populate_buyer_email: "",
  };

  const squareEnv = process.env.SQUARE_ENVIRONMENT === "production" ? "connect" : "connect.squareupsandbox";

  const res = await fetch(
    `https://${squareEnv}.com/v2/online-checkout/payment-links`,
    {
      method: "POST",
      headers: {
        "Square-Version": "2024-01-18",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutBody),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Square checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 502 },
    );
  }

  const data = await res.json();
  const checkoutUrl = data.payment_link?.url;

  if (!checkoutUrl) {
    return NextResponse.json(
      { error: "No checkout URL returned" },
      { status: 502 },
    );
  }

  return NextResponse.json({ url: checkoutUrl });
}
