import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripeA001 } from '@/lib/stripe';
import { printfulRequest } from '@/lib/printful';
import { sendDiscordNotification } from '@/lib/discord';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event;

  try {
    // 1. Verify the event authenticity
    event = stripeA001.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_A001!
    );
  } catch (err: any) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 2. Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    
    // Determine which Printful store to use from Stripe metadata
    const storeId = session.metadata?.storeId || 'A001';

    try {
      // 3. Trigger Printful Fulfillment
      await printfulRequest(storeId, 'orders', {
        method: 'POST',
        body: JSON.stringify({
          recipient: {
            name: session.shipping_details?.name,
            address1: session.shipping_details?.address?.line1,
            city: session.shipping_details?.address?.city,
            state_code: session.shipping_details?.address?.state,
            country_code: session.shipping_details?.address?.country,
            zip: session.shipping_details?.address?.postal_code,
          },
          items: session.metadata?.items ? JSON.parse(session.metadata.items) : [],
        }),
      });

      // 4. Alert Discord of success
      await sendDiscordNotification(
        "Order Processed Successfully",
        `✅ **Store ${storeId}** order confirmed for **$${(session.amount_total / 100).toFixed(2)}**.\nCustomer: ${session.customer_details?.email}`,
        0x22c55e // Green
      );

    } catch (error: any) {
      // Alert Discord if fulfillment fails
      await sendDiscordNotification(
        "Fulfillment Failure",
        `⚠️ Stripe payment succeeded, but Printful order failed for **Store ${storeId}**.\nError: ${error.message}`,
        0xef4444 // Red
      );
    }
  }

  return NextResponse.json({ received: true });
}
