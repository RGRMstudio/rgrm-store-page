import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia', // Use the correct API version
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
    console.log(`Received checkout completion for session: ${session.id}`);

    // Create Printful order
    await createPrintfulOrder(session);
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}

async function createPrintfulOrder(session: Stripe.Checkout.Session) {
  const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY!;
  const STORE_ID = process.env.PRINTFUL_STORE_ID || '17181557'; // Default to your store ID

  const variantId = session.metadata?.variantId; // Retrieve the variant ID from session metadata

  if (!variantId) {
    console.error(`[Webhook Error] No variant ID found in session metadata for session: ${session.id}`);
    return;
  }

  // Extract customer and address details safely using customer_details
  const customerDetails = session.customer_details;

  if (!customerDetails?.address) {
    console.error(`[Webhook Error] No address found in customer_details for session: ${session.id}`);
    return;
  }

  const address = customerDetails.address;

  const orderPayload = {
    recipient: {
      name: customerDetails.name || 'Unknown Customer',
      address1: address.line1 || '',
      address2: address.line2 || '', // Include line2 if available
      city: address.city || '',
      state_code: address.state || '',
      country_code: address.country || '',
      zip: address.postal_code || '',
      email: customerDetails.email || '',
      phone: customerDetails.phone || '',
    },
    items: [
      {
        sync_variant_id: parseInt(variantId, 10), // Ensure it's parsed as an integer
        quantity: session.metadata?.quantity ? parseInt(session.metadata.quantity, 10) : 1, // Use quantity from metadata if available, default to 1
      },
    ],
    external_id: session.id, // Link this Printful order to the Stripe session ID
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
      const errorText = await response.text();
      console.error(`[Printful API Error] Status: ${response.status}, Body: ${errorText}`);
      throw new Error(`Printful API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Successfully created Printful order: ${result.result.id} for Stripe session: ${session.id}`);
    // Optionally, you could add more logic here, like triggering an email via Loops.so
    return result;
  } catch (error: any) {
    console.error('[Webhook Error] Failed to create Printful order:', error.message);
  }
}
