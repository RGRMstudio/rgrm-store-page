import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripeA001 = new Stripe(process.env.STRIPE_SECRET_KEY_A001!, { apiVersion: '2025-12-15.preview' as any });
const stripeA002 = new Stripe(process.env.STRIPE_SECRET_KEY_A002!, { apiVersion: '2025-12-15.preview' as any });

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get('Stripe-Signature') as string;
  let event: Stripe.Event | null = null;
  let activeStore = '';

  const accounts = [
    { secret: process.env.STRIPE_WEBHOOK_SECRET_A001!, id: 'A001', client: stripeA001 },
    { secret: process.env.STRIPE_WEBHOOK_SECRET_A002!, id: 'A002', client: stripeA002 },
  ];

  for (const acc of accounts) {
    try {
      event = acc.client.webhooks.constructEvent(body, sig, acc.secret);
      activeStore = acc.id;
      break; 
    } catch (err) { continue; }
  }

  if (!event) return NextResponse.json({ error: 'RGRM Security: Invalid Signature' }, { status: 400 });

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // EMAIL & DATA CAPTURE
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;
    const productId = session.metadata?.productId || 'Unknown Asset';

    console.log(`📩 RGRM LEADS: Captured email ${customerEmail} for Store ${activeStore}`);

    // DISCORD ALERT with Email
    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `⬛️🟨🟥 **NEW RGRM ACQUISITION** 🟥🟨⬛️`,
        embeds: [{
          title: `RGRM Store ${activeStore} Success`,
          description: `**Collector:** ${customerName} (${customerEmail})\n**Asset:** ${productId}\n**Status:** Fulfillment Dispatched`,
          color: activeStore === 'A001' ? 0xFFFF00 : 0xFF0000 
        }]
      })
    });

    // PRINTFUL DISPATCH
    const printfulKey = activeStore === 'A001' ? process.env.PRINTFUL_STORE_A001_KEY : process.env.PRINTFUL_STORE_A002_KEY;
    await fetch('https://api.printful.com/orders', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${printfulKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { name: customerName, email: customerEmail, address1: session.shipping_details?.address?.line1, city: session.shipping_details?.address?.city, country_code: session.shipping_details?.address?.country, zip: session.shipping_details?.address?.postal_code },
        items: [{ external_id: productId, quantity: 1 }],
        confirm: false 
      })
    });
  }

  return NextResponse.json({ received: true });
}
