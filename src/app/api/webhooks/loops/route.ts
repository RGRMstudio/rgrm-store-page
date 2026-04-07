import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * RGRMstore - Loops Feedback Webhook (Zero-Dependency Version)
 * Handles: delivery confirmation, bounce escalations, and registry logs.
 */

export async function POST(req: Request) {
  const body = await req.text();
  
  // Loops sends the signature in the 'Webhook-Signature' header
  const signature = req.headers.get('Webhook-Signature');
  const secret = process.env.LOOPS_WEBHOOK_SECRET;

  // 1. Security Check: Verify that the request actually came from Loops
  if (!signature || !secret) {
    console.error('[RGRM ERROR] Missing Loops Webhook Signature or Secret');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(body).digest('hex');

  if (signature !== digest) {
    console.error('[RGRM ERROR] Invalid Loops Webhook Signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(body);

  // 2. Event Handling Logic
  switch (event.type) {
    case 'contact.created':
      console.log(`[RGRM LOG] New Identity registered: ${event.data.email}`);
      break;

    case 'email.delivered':
      console.log(`[RGRM SUCCESS] Module delivered to: ${event.data.email}`);
      break;

    case 'email.bounced':
      console.warn(`[RGRM ALERT] Email bounced for: ${event.data.email}. Escalating.`);
      
      // Trigger the Admin Escalation via native fetch
      await fetch('https://app.loops.so/api/v1/events/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: "admin@raguiromo.store", 
          eventName: "Delivery_Escalation",
          eventProperties: {
            failedEmail: event.data.email,
            reason: event.data.reason || "Hard Bounce",
            registryNode: "17181557"
          }
        })
      });
      break;

    default:
      console.log(`[RGRM INFO] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
