import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName, price, quantity = 1, email } = body;

    if (!productName || !price) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-06-20",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          quantity,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(parseFloat(price) * 100),
            product_data: {
              name: productName,
            },
          },
        },
      ],
      after_expiration: {
        recovery: {
          enabled: true,
          allow_promotion_codes: true,
        },
      },
      consent_collection: {
        promotions: "auto",
      },
      customer_email: email || undefined,
      success_url: `${process.env.NEXT_PUBLIC_SITE || "https://raguiromo.store"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE || "https://raguiromo.store"}/selection`,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error("[ERROR]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}