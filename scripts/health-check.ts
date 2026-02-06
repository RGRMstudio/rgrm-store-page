import Stripe from 'stripe';

async function verifyStudioIntegrity() {
  console.log('--- RGRM STUDIO: SYSTEM INTEGRITY CHECK ---');
  console.log('Founder: Raul Guillermo Rosario Morales');
  console.log('Status: INITIATING...');
  console.log('---');

  // 1. Verify Stripe Connection
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16' as any,
    });
    const balance = await stripe.balance.retrieve();
    console.log('✅ STRIPE: Connection Authenticated.');
  } catch (error) {
    console.error('❌ STRIPE: Connection Failure. Check STRIPE_SECRET_KEY.');
  }

  // 2. Verify Printful Connection (Store 002)
  try {
    const response = await fetch('https://api.printful.com/stores/17181557', {
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ PRINTFUL: Store "${data.result.name}" (17181557) Authenticated.`);
    } else {
      console.error('❌ PRINTFUL: Store Authentication Failed. Check PRINTFUL_API_KEY.');
    }
  } catch (error) {
    console.error('❌ PRINTFUL: System Unreachable.');
  }

  // 3. Verify Environment Base URL
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    console.log(`✅ BASE URL: Detected as ${process.env.NEXT_PUBLIC_BASE_URL}`);
  } else {
    console.warn('⚠️ WARNING: NEXT_PUBLIC_BASE_URL is missing. Redirects may fail.');
  }

  console.log('---');
  console.log('INTEGRITY CHECK COMPLETE.');
}

verifyStudioIntegrity();
