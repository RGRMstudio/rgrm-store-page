import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia', // Stable production version
});

export async function POST(req: Request) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        // TODO: Replace with your actual Stripe Price ID from Dashboard
        price: 'price_YOUR_ACTUAL_STRIPE_ID', 
        quantity: 1,
      }],
      mode: 'payment',
      metadata: {
        // Your specific product variant
        printful_variant_id: '69ae86fb786ec2', 
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
