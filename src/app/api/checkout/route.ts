import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-03-25.preview', // Dahlia release for crypto & security features
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      // Includes support for standard cards and crypto as per Dahlia release
      payment_method_types: ['card', 'crypto'], 
      line_items: [
        {
          // Replace with your real Stripe Price ID from Dashboard
          price: 'price_REPLACE_WITH_YOUR_ACTUAL_ID', 
          quantity: 1,
        },
      ],
      mode: 'payment',
      // This metadata is CRITICAL for your Printful automation
      metadata: {
        printful_variant_id: '69ae86fb786ec2', 
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    });

    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error(`[STRIPE ERROR]: ${err.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
