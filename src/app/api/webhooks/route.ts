import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!endpointSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
    }
    const stripe = getStripe();
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

  // ✅ Safe access using type assertion for optional properties
  const sessionAny = session as any;
  const shippingAddress = sessionAny.shipping?.address || sessionAny.customer_details?.address;
  const customerEmail = session.customer_details?.email || '';
  const customerName = session.customer_details?.name || 'Customer';
  const customerPhone = session.customer_details?.phone || '';

  const orderPayload = {
    recipient: {
      name: customerName,
      address1: shippingAddress?.line1 || '',
      city: shippingAddress?.city || '',
      state_code: shippingAddress?.state || '',
      country_code: shippingAddress?.country || '',
      zip: shippingAddress?.postal_code || '',
      email: customerEmail,
      phone: customerPhone,
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
