import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import axios from 'axios';
import { LoopsClient } from 'loops';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const loops = new LoopsClient(process.env.LOOPS_API_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  try {
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;

      // 1. ORDER PRINTFUL (The Factory)
      await axios.post('https://api.printful.com/orders', {
        recipient: {
          name: session.customer_details?.name,
          email: email,
          address1: session.shipping_details?.address?.line1,
          city: session.shipping_details?.address?.city,
          state_code: session.shipping_details?.address?.state,
          country_code: session.shipping_details?.address?.country,
          zip: session.shipping_details?.address?.postal_code,
        },
        items: [{
          sync_variant_id: parseInt(session.metadata?.printful_variant_id || "0"),
          quantity: 1,
        }],
      }, {
        headers: { 'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}` }
      });

      // 2. EMAIL CUSTOMER (The Messenger)
      if (email) {
        await loops.sendEvent({
          email: email,
          eventName: 'order_confirmed',
          contactProperties: { cartStatus: 'purchased' }
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
