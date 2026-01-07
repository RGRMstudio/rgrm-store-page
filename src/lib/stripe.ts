import Stripe from 'stripe';

/**
 * PRODUCTION STRIPE CONFIGURATION
 * * This file initializes the Stripe SDK using the Secret Key 
 * provided in your Vercel Environment Variables.
 */

// 1. Extract the Secret Key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// 2. Strict Validation: If the key is missing, the app will log a clear error
if (!stripeSecretKey) {
  console.error(
    '❌ STRIPE ERROR: STRIPE_SECRET_KEY is missing. ' +
    'Please add it to your Vercel Environment Variables.'
  );
}

// 3. Initialize the Stripe instance
export const stripe = new Stripe(stripeSecretKey || '', {
  // Use the latest stable API version for your RGRM Boutique
  apiVersion: '2024-12-18.acacia',
  typescript: true,
  appInfo: {
    name: "RGRM Boutique Store",
    version: "1.0.0",
  },
});

/**
 * Diagnostic Helper: 
 * You can call this in your API routes to verify 
 * if your Vercel keys are actually connecting to Stripe.
 */
export async function verifyStripeConnection() {
  try {
    const account = await stripe.accounts.retrieve();
    console.log('✅ Stripe Connection Verified:', account.id);
    return { success: true, accountId: account.id };
  } catch (error: any) {
    console.error('❌ Stripe Verification Failed:', error.message);
    return { success: false, error: error.message };
  }
}
