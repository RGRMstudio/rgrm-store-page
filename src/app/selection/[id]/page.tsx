'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Inside your component:
const handleBuyNow = async (product: any, selectedVariant: any) => {
  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product._id,
        variantId: selectedVariant.printfulVariantId, // Your Printful sync_variant_id
        price: selectedVariant.price,
        name: product.name,
        thumbnail: product.thumbnail,
        size: selectedVariant.size,
        description: product.description,
      }),
    });

    const data = await res.json();
    
    if (data.url) {
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } else {
      alert('Error: ' + (data.error || 'Could not create checkout session'));
    }
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Something went wrong. Please try again.');
  }
};
