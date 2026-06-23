import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  packageTitle: z.string().min(1),
  priceAmount: z.number().int().positive(),
  squareItemId: z.string().optional().default(""),
});

function cleanEnv(value: string | undefined) {
  return value?.trim() || "";
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { packageTitle, priceAmount } = parsed.data;
  const accessToken = cleanEnv(process.env.SQUARE_ACCESS_TOKEN);
  const locationId = cleanEnv(process.env.SQUARE_LOCATION_ID);
  const squareEnvironment = cleanEnv(process.env.SQUARE_ENVIRONMENT).toLowerCase();
  const baseUrl = cleanEnv(process.env.NEXT_PUBLIC_BASE_URL) || "https://www.re-self.org";
  const missingConfig = [
    !accessToken ? "SQUARE_ACCESS_TOKEN" : "",
    !locationId ? "SQUARE_LOCATION_ID" : "",
  ].filter(Boolean);

  if (missingConfig.length > 0) {
    console.error("Square checkout configuration missing:", missingConfig.join(", "));
    return NextResponse.json(
      {
        error: "Payment configuration missing",
        details: `Missing ${missingConfig.join(", ")}. Confirm the variables are set in Vercel Production and redeploy.`,
      },
      { status: 500 },
    );
  }

  if (!["production", "sandbox"].includes(squareEnvironment)) {
    console.error("Invalid SQUARE_ENVIRONMENT:", process.env.SQUARE_ENVIRONMENT);
    return NextResponse.json(
      {
        error: "Payment configuration invalid",
        details: "SQUARE_ENVIRONMENT must be exactly production or sandbox.",
      },
      { status: 500 },
    );
  }

  const checkoutBody = {
    idempotency_key: crypto.randomUUID(),
    quick_pay: {
      name: packageTitle,
      price_money: {
        amount: priceAmount,
        currency: "USD",
      },
      location_id: locationId,
    },
    checkout_options: {
      redirect_url: `${baseUrl.replace(/\/$/, "")}/packages/success`,
    },
  };

  const squareHost = squareEnvironment === "production" ? "connect.squareup.com" : "connect.squareupsandbox.com";

  try {
    const res = await fetch(
      `https://${squareHost}/v2/online-checkout/payment-links`,
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
      console.error("Square checkout error:", {
        status: res.status,
        environment: squareEnvironment,
        locationId,
        body: err,
      });
      return NextResponse.json(
        {
          error: "Failed to create checkout",
          details: `Square returned ${res.status}. Check that the access token, location ID, environment, and currency all belong to the same Square account.`,
          squareError: err,
        },
        { status: 502 },
      );
    }

    const data = await res.json();
    const checkoutUrl = data.payment_link?.url;

    if (!checkoutUrl) {
      console.error("Square checkout missing URL:", data);
      return NextResponse.json(
        {
          error: "No checkout URL returned",
          details: "Square created a response without a payment link URL.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Square checkout request failed:", error);
    return NextResponse.json(
      {
        error: "Failed to contact Square",
        details: "The checkout service could not reach Square. Please try again shortly.",
      },
      { status: 502 },
    );
  }
}
