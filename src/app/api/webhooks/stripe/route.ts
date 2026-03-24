import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

// Initialize Stripe with the latest API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia' as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`❌ Webhook Signature Verification Failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 01 // SUCCESSFUL CHECKOUT HANDLER
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Retrieve the session with line_items expanded to see what was bought
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items', 'line_items.data.price.product'],
    });

    // Bypass StripeResponse wrapper type check
    const sessionData = fullSession as any;
    
    const customerEmail = sessionData.customer_details?.email;
    const shipping = sessionData.shipping_details;
    const lineItems = sessionData.line_items?.data || [];

    console.log(`🔔 Order Confirmed: ${session.id} | Customer: ${customerEmail}`);

    // 02 // MULTI-PRODUCT FULFILLMENT LOGIC
    // We map through the items bought to prepare the Printful order
    const printfulItems = lineItems.map((item: any) => {
      // It looks for 'printful_variant_id' in the Stripe Product Metadata
      const variantId = item.price?.product?.metadata?.printful_variant_id;
      
      return {
        variant_id: variantId ? parseInt(variantId) : null,
        quantity: item.quantity,
      };
    }).filter((item: any) => item.variant_id !== null);

    if (printfulItems.length > 0) {
      try {
        // Prepare the payload for Printful API (Store 17181557)
        const printfulPayload = {
          recipient: {
            name: shipping?.name,
            address1: shipping?.address?.line1,
            address2: shipping?.address?.line2,
            city: shipping?.address?.city,
            state_code: shipping?.address?.state,
            country_code: shipping?.address?.country,
            zip: shipping?.address?.postal_code,
          },
          items: printfulItems,
          external_id: session.id, // Links Stripe ID to Printful for tracking
        };

        console.log('📦 Sending to Printful:', JSON.stringify(printfulPayload));

        // TODO: Add your fetch() or printful-client call here using process.env.PRINTFUL_API_KEY
        
      } catch (error) {
        console.error('❌ Printful Automation Failed:', error);
      }
    }

    // 03 // IDENTITY REGISTRY (LOOPS.SO)
    if (customerEmail) {
      try {
        // Trigger Loops.so event for "Structural Study Acquisition"
        console.log(`🆔 Registering Identity: ${customerEmail} in Loops.so`);
      } catch (error) {
        console.error('❌ Loops Registration Failed:', error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
