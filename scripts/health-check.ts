import Stripe from 'stripe';
import * as dotenv from 'dotenv';

// ⬛ RGRM POWER PROTOCOL: Load keys from the archive
dotenv.config({ path: '.env.local' });

async function verifyStudioIntegrity() {
  console.log('--- RGRM STUDIO: SYSTEM INTEGRITY CHECK ---');
  console.log('Founder: Raul Guillermo Rosario Morales');
  console.log('Status: INITIATING...');
  console.log('---');

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const printfulKey = process.env.PRINTFUL_API_KEY;

  // 1. Verify Stripe Connection
  if (!stripeKey) {
    console.error('❌ STRIPE: Key missing in .env.local');
  } else {
    try {
      const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' as any });
      await stripe.balance.retrieve();
      console.log('✅ STRIPE: Connection Authenticated.');
    } catch (error) {
      console.error('❌ STRIPE: Authentication Failed. Verify your sk_live key.');
    }
  }

  // 2. Verify Printful Connection (Store 002: 17181557)
  if (!printfulKey) {
    console.error('❌ PRINTFUL: Key missing in .env.local');
  } else {
    try {
      const response = await fetch('https://api.printful.com/stores/17181557', {
        headers: { 'Authorization': `Bearer ${printfulKey}` },
      });
      if (response.ok) {
        console.log('✅ PRINTFUL: Store 002 Authenticated.');
      } else {
        console.error('❌ PRINTFUL: Auth Failed. Check your Printful API token.');
      }
    } catch (error) {
      console.error('❌ PRINTFUL: System Unreachable.');
    }
  }

  // 3. Verify Redirect URL
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    console.log(`✅ BASE URL: ${process.env.NEXT_PUBLIC_BASE_URL}`);
  } else {
    console.warn('⚠️ WARNING: NEXT_PUBLIC_BASE_URL missing.');
  }

  console.log('---');
  console.log('INTEGRITY CHECK COMPLETE.');
}

verifyStudioIntegrity();
