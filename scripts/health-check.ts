import Stripe from 'stripe';
import 'dotenv/config'; // Ensures variables are injected during direct execution

async function verifyStudioIntegrity() {
  console.log('--- RGRM STUDIO: SYSTEM INTEGRITY CHECK ---');
  console.log('Founder: Raul Guillermo Rosario Morales');
  console.log('Status: INITIATING...');
  console.log('---');

  // 1. Stripe Verification
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16' as any,
    });
    await stripe.balance.retrieve();
    console.log('✅ STRIPE: Connection Authenticated.');
  } catch (error) {
    console.error('❌ STRIPE: Authentication Failed. Verify your secret key.');
  }

  // 2. Printful Verification
  try {
    const response = await fetch('https://api.printful.com/stores/17181557', {
      headers: { 'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}` },
    });
    if (response.ok) {
      console.log('✅ PRINTFUL: Store 17181557 Authenticated.');
    } else {
      console.error('❌ PRINTFUL: Key missing or invalid in .env.local.');
    }
  } catch (error) {
    console.error('❌ PRINTFUL: System Unreachable.');
  }

  console.log('---');
  console.log('INTEGRITY CHECK COMPLETE.');
}

verifyStudioIntegrity();
