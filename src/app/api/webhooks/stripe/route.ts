import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createPrintfulOrder } from '@/lib/printful';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
<<<<<<< HEAD
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
=======
  // No apiVersion - use SDK default
});

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return NextResponse.json({ error: 'Missing signature or secret' }, { status: 401 });
    }

    // Verify Stripe webhook
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract order info
      const productId = session.metadata?.productId;
      const syncVariantId = session.metadata?.syncVariantId; // You'll add this to product in Sanity

      if (!productId || !syncVariantId) {
        console.error('Missing product or variant ID in session metadata');
        return NextResponse.json({ error: 'Invalid session metadata' }, { status: 400 });
      }

      // Create order in Printful
      await createPrintfulOrder({
        customer: {
          name: session.customer_details?.name || 'Customer',
          email: session.customer_details?.email || '',
          phone: session.customer_details?.phone || '',
          address: {
            line1: session.shipping_details?.address?.line1 || '',
            city: session.shipping_details?.address?.city || '',
            state: session.shipping_details?.address?.state || '',
            postalCode: session.shipping_details?.address?.postal_code || '',
            country: session.shipping_details?.address?.country || '',
          },
        },
        items: [
          {
            syncVariantId: syncVariantId, // From Sanity product
            quantity: 1,
            retailPrice: parseFloat(session.metadata?.price || '0'),
          },
        ],
        externalId: session.id, // Link Stripe session to Printful order
      });
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
>>>>>>> fd8558f (feat: add Stripe checkout and Printful order automation)
  }

  const result = await response.json();
  console.log(`✅ Printful order created: ${result.result.id}`);
  return result;
}
