import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

/**
 * RaGuiRoMo Bauhaus Checkout Route
 * This handler creates a Stripe Checkout Session and links it
 * to your primary Printful Store (Store 002) via metadata.
 */

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        // price: your Stripe Price ID (e.g., price_1234...)
        price: item.priceId || process.env.STRIPE_PRICE_ID,
        quantity: item.quantity || 1,
      })),
      mode: 'payment',
      // Redirect URLs after payment
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      
      // CRITICAL: This metadata tells the Webhook to route to Printful Store 002
      metadata: {
        printful_store_id: process.env.PRINTFUL_STORE_002_ID,
        project_name: 'RaGuiRoMo Bauhaus Registry'
      },
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: any) {
    console.error('Checkout Error:', err.message);
    return NextResponse.json(
      { error: 'Could not create checkout session' },
      { status: 500 }
    );
  }
}
