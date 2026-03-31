"use server";

import { stripe } from "@/lib/stripe"; // Ensure it imports from the updated lib/stripe
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function createCheckout(
  variantId: number, 
  productName: string, 
  price: number, 
  size: string
) {
  const headerList = await headers();
  const host = headerList.get("host") || "raguiromo.store";
  const origin = host.includes("localhost") ? `http://${host}` : `https://${host}`;

  // Stripe will now use the RGRMStore key initialized in lib/stripe
  const session = await stripe.checkout.sessions.create({
    automatic_tax: { enabled: true },
    shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB'] },
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { 
            name: `${productName} — SIZE: ${size}`,
          },
          unit_amount: Math.round(price * 100),
          tax_behavior: "exclusive",
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
    metadata: {
      variant_id: variantId.toString(),
      product_size: size,
    },
  });

  if (session.url) {
    redirect(session.url);
  }
}
