import Stripe from 'stripe';

// Use a global variable to cache the Stripe instance across hot reloads in development
const globalForStripe = global as unknown as { stripe: Stripe | undefined };

/**
 * Lazily creates (and caches) the Stripe client.
 *
 * Never instantiate Stripe at module scope — route modules are evaluated
 * during `next build` page-data collection, and `new Stripe(undefined)`
 * throws, breaking the build when STRIPE_SECRET_KEY is not present.
 */
export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  if (!globalForStripe.stripe) {
    globalForStripe.stripe = new Stripe(secretKey, {
      // No apiVersion - Stripe will use the default version for your SDK
      typescript: true,
      appInfo: {
        name: 'RaGuiRoMo Store Registry',
        version: '1.0.0',
      },
    });
  }

  return globalForStripe.stripe;
}
