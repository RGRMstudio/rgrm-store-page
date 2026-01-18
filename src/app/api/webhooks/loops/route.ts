import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { LoopsClient } from "loops";

/**
 * RGRMstore - Loops Feedback Webhook
 * Handles: delivery confirmation, bounce escalations, and registry logs.
 */

const loops = new LoopsClient(process.env.LOOPS_API_KEY as string);

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  
  // Loops sends the signature in the 'Webhook-Signature' header
  const signature = headersList.get('Webhook-Signature');
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
      console.log(`[RGRM LOG] New Identity registered in Loops: ${event.data.email}`);
      break;

    case 'email.delivered':
      console.log(`[RGRM SUCCESS] Module delivered to: ${event.data.email}`);
      break;

    case 'email.bounced':
      console.warn(`[RGRM ALERT] Email bounced for: ${event.data.email}. Triggering Escalation.`);
      
      // Trigger the Admin Escalation Flow in Loops
      await loops.sendEvent({
        email: "admin@raguiromo.store", // Update with your actual admin email
        eventName: "Delivery_Escalation",
        eventProperties: {
          failedEmail: event.data.email,
          reason: event.data.reason || "Hard Bounce",
          registryNode: "17181557"
        }
      });
      break;

    default:
      console.log(`[RGRM INFO] Unhandled Loops event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
