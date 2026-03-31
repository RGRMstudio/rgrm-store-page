import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';

async function sendDiscordNotification(orderData: any) {
  if (!process.env.DISCORD_WEBHOOK_URL) return;
  const message = {
    embeds: [{
      title: "🚀 NEW REGISTRY ENTRY",
      description: `**${orderData.customerName}** just ordered a **${orderData.productName}**`,
      color: 0x000000,
      fields: [
        { name: "Size", value: orderData.size, inline: true },
        { name: "Amount", value: `$${(orderData.amount / 100).toFixed(2)}`, inline: true }
      ],
      timestamp: new Date().toISOString()
    }]
  };
  await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  });
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get('stripe-signature') as string;

  // Use the RGRMStore-prefixed webhook secret from Vercel
  const webhookSecret = 
    process.env.RGRMStore_STRIPE_WEBHOOK_SECRET || 
    process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret!);
    
    if (event.type === 'checkout.session.completed') {
      const session: any = event.data.object;
      
      // 1. Sync to Printful
      await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: {
            name: session.customer_details.name,
            address1: session.shipping_details.address.line1,
            city: session.shipping_details.address.city,
            state_code: session.shipping_details.address.state,
            zip: session.shipping_details.address.postal_code,
            country_code: session.shipping_details.address.country,
          },
          items: [{ variant_id: session.metadata.variant_id, quantity: 1 }],
        }),
      });

      // 2. Ka-ching! Discord Notify
      await sendDiscordNotification({
        customerName: session.customer_details.name,
        productName: session.line_items?.[0]?.description || "RGRM Selection",
        size: session.metadata.product_size,
        amount: session.amount_total
      });
    }
    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
