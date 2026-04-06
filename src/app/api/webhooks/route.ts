import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error(`[ERROR] Webhook Signature Failed: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // 1. Trigger Printful Order (Draft Mode by Default)
    const printfulResponse = await fetch('https://api.printful.com/orders', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipient: {
          name: session.shipping_details.name,
          address1: session.shipping_details.address.line1,
          city: session.shipping_details.address.city,
          state_code: session.shipping_details.address.state,
          country_code: session.shipping_details.address.country,
          zip: session.shipping_details.address.postal_code,
        },
        items: JSON.parse(session.metadata.items), // Expects Array of Variant IDs
        confirm: false // Set to false to review in Printful dashboard first
      })
    });

    // 2. Trigger Loops Terminal Voice Email
    await fetch('https://app.loops.so/api/v1/events/send', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        eventName: 'Order_Success',
        email: session.customer_details.email,
        contactProperties: {
          firstName: session.customer_details.name.split(' ')[0],
          status: 'SIGNAL_DEPLOYED',
          orderTotal: (session.amount_total / 100).toFixed(2)
        }
      })
    });

    console.log(`[STATUS] Order Processed for: ${session.customer_details.email}`);
  }

  return NextResponse.json({ received: true });
}
