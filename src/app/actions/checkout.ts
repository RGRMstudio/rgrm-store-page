"use server";

import { stripeA001, stripeA002 } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function createCheckoutSession(formData: FormData) {
  const productId = formData.get("productId") as string;
  const storeId = formData.get("storeId") as string; // Identifies A001 or A002

  // Select the appropriate financial engine based on the storeId
  const activeStripe = storeId === "A002" ? stripeA002 : stripeA001;

  // Create the session WITHOUT the stripeVersion property
  const session = await activeStripe.checkout.sessions.create({
    line_items: [
      {
        price: productId, // The Stripe Price ID
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    metadata: {
      storeId: storeId,
      productId: productId,
    },
  });

  if (session.url) {
    redirect(session.url);
  }
}
