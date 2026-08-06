"use server";

import { getStripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function createCheckout(variantId: number, productName: string, price: number) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const origin = `${protocol}://${host}`;

  // 1. (Reserved) Create a "Shadow" contact in Loops to track potential abandonment.
  // This works best if you collect the email before this step, but for now it
  // prepares the system for the Stripe data.

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: productName },
          unit_amount: Math.round(price * 100), // Stripe works in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
    // THE MAGIC: This metadata travels to your webhook
    metadata: {
      printful_variant_id: variantId.toString(),
    },
  });

  if (session.url) {
    redirect(session.url);
  }
}
