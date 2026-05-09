import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ valid: false, error: 'Missing session_id' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      // Optional: Create Printful order here (we'll add this next)
      return NextResponse.json({ valid: true, session });
    }
    
    return NextResponse.json({ valid: false, error: 'Payment not completed' });
  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json({ valid: false, error: error.message }, { status: 500 });
  }
}
