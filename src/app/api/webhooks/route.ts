import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Using SDK default API version
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Create Printful order
    await createPrintfulOrder(session);
  }

  return NextResponse.json({ received: true });
}

async function createPrintfulOrder(session: Stripe.Checkout.Session) {
  const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY!;
  const STORE_ID = process.env.PRINTFUL_STORE_ID || '17181557';
  
  const variantId = session.metadata?.variantId;
  
  if (!variantId) {
    console.error('No variant ID found in session metadata');
    return;
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

  try {
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
  } catch (error: any) {
    console.error('Error creating Printful order:', error.message);
  }
}
