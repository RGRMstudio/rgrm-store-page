import Stripe from 'stripe';

/**
 * PRODUCTION STRIPE INITIALIZATION
 * This file pulls the Secret Key from your Vercel Environment Variables.
 */

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Strict Validation: This ensures we catch missing keys during the build/runtime
if (!stripeSecretKey) {
  console.error(
    '❌ STRIPE CONFIGURATION ERROR: STRIPE_SECRET_KEY is missing. ' +
    'Check your Vercel Environment Variables.'
  );
}

export const stripe = new Stripe(stripeSecretKey || '', {
  // Utilizing the stable API version for the RGRM Boutique
  apiVersion: '2024-12-18.acacia',
  typescript: true,
  appInfo: {
    name: "RGRM Boutique",
    version: "1.0.0",
  },
});

/**
 * Diagnostic helper to verify the Stripe connection.
 * Call this in your API routes to check connectivity in Vercel logs.
 */
export async function verifyStripeConnection() {
  try {
    const account = await stripe.accounts.retrieve();
    console.log('✅ Stripe Connection Successful:', account.id);
    return true;
  } catch (error: any) {
    console.error('❌ Stripe Connection Failed:', error.message);
    return false;
  }
}
