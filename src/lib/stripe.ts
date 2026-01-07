import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('CRITICAL: STRIPE_SECRET_KEY is missing from environment variables.');
}

export const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
  appInfo: {
    name: "RGRM Boutique",
    version: "1.0.0",
  },
});

/**
 * Diagnostic helper to verify the Stripe connection
 * Check your Vercel logs to see the output of this function.
 */
export async function verifyStripeConnection() {
  try {
    const account = await stripe.accounts.retrieve();
    console.log('✅ Stripe Connection Successful: Verified account', account.id);
    return true;
  } catch (error: any) {
    console.error('❌ Stripe Connection Failed:', {
      message: error.message,
      type: error.type,
      code: error.code,
    });
    return false;
  }
}
