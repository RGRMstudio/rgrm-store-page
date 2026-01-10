import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your Secret Key (Pulled safely from Vercel/Env)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia", // Updated to the latest stable API
});

export async function POST(req: Request) {
  try {
    // 1. Log the attempt to Discord for your own tracking
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: "🚀 **Checkout Initiated**: A user has clicked 'Register Identity' on raguiromo.store"
        }),
      });
    }

    // 2. Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      // The specific UI settings you configured in your Stripe Dashboard
      payment_method_configuration: "pmc_1Sfje3DVc7z8RC9ISTPN7WcP",
      
      line_items: [
        {
          // Your Bauhaus Identity Registration Product
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      
      // Dynamic URLs based on your environment (Local vs Vercel)
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      
      // Metadata helps you identify the user in your Stripe Dashboard later
      metadata: {
        project: "RGRM-BAUHAUS-STORE",
        action: "IDENTITY_REGISTRATION",
      },
    });

    // 3. Return the URL to the frontend for redirection
    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("STRIKE CHECKOUT ERROR:", error);

    // Alert Discord if the checkout fails (extremely helpful for debugging)
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `❌ **Checkout Error**: ${error.message}`
        }),
      });
    }

    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
