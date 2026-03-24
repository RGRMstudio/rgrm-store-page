import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia' as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Retrieve full session with line items
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items'],
    });

    // CAST TO ANY: This bypasses the "Property does not exist on Response" error
    const sessionData = fullSession as any;

    const shipping = sessionData.shipping_details;
    const customer = sessionData.customer_details;
    const variantId = sessionData.metadata?.printful_variant_id;

    console.log('✅ Processing order for:', customer?.email);
    
    // Your Printful / Loops logic continues here...
  }

  return NextResponse.json({ received: true });
}
