import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await createPrintfulOrder(session);
  }

  return NextResponse.json({ received: true });
}

async function createPrintfulOrder(session: Stripe.Checkout.Session) {
  const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY!;
  const STORE_ID = '17181557';
  
  const variantId = session.metadata?.variantId;
  
  if (!variantId) {
    throw new Error('No variant ID found in session metadata');
  }

  const orderPayload = {
    recipient: {
      name: session.customer_details?.name || 'Customer',
      address1: session.shipping_details?.address?.line1 || '',
      city: session.shipping_details?.address?.city || '',
      state_code: session.shipping_details?.address?.state || '',
      country_code: session.shipping_details?.address?.country || '',
      zip: session.shipping_details?.address?.postal_code || '',
      email: session.customer_details?.email || '',
      phone: session.customer_details?.phone || '',
    },
    items: [
      {
        sync_variant_id: parseInt(variantId),
        quantity: 1,
      },
    ],
    external_id: session.id,
  };

  const response = await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
      'X-PF-Store-ID': STORE_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderPayload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Printful API error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  console.log(`✅ Printful order created: ${result.result.id}`);
  return result;
}
