import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripeA001, stripeA002 } from '@/lib/stripe';
import { printfulRequest } from '@/lib/printful';
import { sendDiscordNotification } from '@/lib/discord';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event;

  try {
    // 1. Verify that the event actually came from Stripe
    event = stripeA001.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_A001!
    );
  } catch (err: any) {
    console.error(`Webhook Signature Verification Failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 2. Handle the "Payment Success" Event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const storeId = session.metadata?.storeId || 'A001'; // Default to A001 if missing

    try {
      // 3. Create Fulfillment in the correct Printful Account
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

      // 4. Send Success Notification to Discord
      await sendDiscordNotification(
        "Order Successful!",
        `✅ **Store ${storeId}** just received an order for **$${(session.amount_total / 100).toFixed(2)}**.\nCustomer: ${session.customer_details?.email}`,
        0x00FF00 // Success Green
      );

    } catch (fulfillmentError: any) {
      // Alert Discord if Printful fails while Stripe succeeded
      await sendDiscordNotification(
        "Fulfillment ERROR",
        `⚠️ Payment was successful, but Printful order failed for **Store ${storeId}**.\nError: ${fulfillmentError.message}`,
        0xFF0000 // Error Red
      );
    }
  }

  return NextResponse.json({ received: true });
}
