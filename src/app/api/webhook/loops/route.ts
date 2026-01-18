import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('Webhook-Signature');
  const secret = process.env.LOOPS_WEBHOOK_SECRET;

  // 1. Verify Signature (Security)
  if (!signature || !secret) {
    return NextResponse.json({ error: 'Missing signature or secret' }, { status: 401 });
  }

  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(body).digest('hex');

  if (signature !== digest) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // 2. Process the Event
  const event = JSON.parse(body);
  console.log(`[RGRM LOG] Loops Event Received: ${event.type}`);

  if (event.type === 'email.bounced') {
    // Logic: Flag this order in your system because the customer won't see their tracking
    console.warn(`[RGRM ALERT] Email bounced for user: ${event.data.email}`);
  }

  return NextResponse.json({ received: true });
}
