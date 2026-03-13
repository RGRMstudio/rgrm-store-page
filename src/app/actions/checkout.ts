"use server";

import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Updated to match Stripe library ^17.7.0 requirements
  // @ts-ignore
  apiVersion: '2025-02-24.acacia',
});

export async function createCheckoutSession(priceId: string) {
  const headersList = headers();
  const origin = headersList.get("origin");

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/selection`,
      
      // RGRM Branding & Fulfillment Metadata
      metadata: {
        project: "RGRM_STORE",
        type: "IDENTITY_REGISTRATION",
        printful_variant_id: process.env.PRINTFUL_VARIANT_ID || "",
      },
      
      // Optional: Automatic tax & shipping if configured in Stripe
      automatic_tax: { enabled: false },
    });

    return { sessionId: session.id, url: session.url };
  } catch (error) {
    console.error("RGRM Checkout Error:", error);
    throw new Error("Failed to create checkout session");
  }
}
