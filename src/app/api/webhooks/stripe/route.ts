import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Structural Error: Missing Signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Authenticating the origin of the signal to ensure system integrity
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`[RGRM SECURITY ALERT]: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful acquisition
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Registry Metadata Extraction
    const artifactId = session.metadata?.artifactId; // e.g., RGRM-001-B
    const selectedSize = session.metadata?.size || 'M';
    const customerEmail = session.customer_details?.email;

    console.log(`[RGRM LOGISTICS]: Initiating production for ${artifactId} (Size: ${selectedSize}) for ${customerEmail}`);

    await triggerPrintfulOrder(session, artifactId, selectedSize);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

/**
 * Communicates with Printful Store 002 (17181557)
 */
async function triggerPrintfulOrder(session: Stripe.Checkout.Session, artifactId: string | undefined, size: string) {
  const customer = session.customer_details;

  // RGRM Registry Mapping: Link ID + SIZE to Printful Sync Variant IDs
  // Update these IDs as you finalize products in your Printful Dashboard
  const variantMap: { [key: string]: number } = {
    'RGRM-001-B-S': 11111111,
    'RGRM-001-B-M': 22222222,
    'RGRM-001-B-L': 33333333,
    'RGRM-001-B-XL': 44444444,
  };

  const lookupKey = `${artifactId}-${size}`;
  const variantId = variantMap[lookupKey];

  if (!variantId) {
    console.error(`[FULFILLMENT ERROR]: Variant ID mapping missing for ${lookupKey}`);
    return;
  }

  try {
    const response = await fetch('https://api.printful.com/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient: {
          name: customer?.name,
          email: customer?.email,
          address1: customer?.address?.line1,
          city: customer?.address?.city,
          state_code: customer?.address?.state,
          country_code: customer?.address?.country,
          zip: customer?.address?.postal_code,
        },
        items: [{ sync_variant_id: variantId, quantity: 1 }],
        external_id: session.id,
        metadata: {
          registry_id: artifactId,
          founder: "Raul Guillermo Rosario Morales",
          studio: "RGRM Studio"
        }
      }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log(`[PRINTFUL STATUS]: Order ${result.result.id} injected into production.`);
    } else {
      console.error(`[PRINTFUL API ERROR]: ${result.error.message}`);
    }
  } catch (error) {
    console.error('[SYSTEM CRITICAL]: Failed to connect to Printful production floor.', error);
  }
}
