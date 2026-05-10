'use client';

import { useState } from 'react';

// Inside your component:
const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

const handleBuyNow = async () => {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: product._id,
      variantId: selectedVariant.printfulVariantId,
      price: selectedVariant.price,
      name: product.name,
      thumbnail: product.thumbnail,
      size: selectedVariant.size,
    }),
  });

  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  }
};
