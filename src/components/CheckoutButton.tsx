'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Props {
  productName: string;
  price: number;
  priceId?: string | null;
  variantId?: string;
}

export default function CheckoutButton({ productName, price, priceId, variantId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, price, priceId, variantId }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); setLoading(false); return; }
      if (data.url) { window.location.href = data.url; return; }
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.id });
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          width: '100%',
          backgroundColor: loading ? '#333' : '#f5f5f5',
          color: '#050505',
          padding: '1.25rem 2rem',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.2em',
          fontSize: '13px',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'monospace',
          transition: 'background 0.2s',
        }}
      >
        {loading ? 'INITIALIZING...' : 'INITIATE ACQUISITION'}
      </button>
      {error && (
        <p style={{ color: '#bc2026', fontFamily: 'monospace', fontSize: '11px', marginTop: '0.5rem' }}>
          error: {error}
        </p>
      )}
    </div>
  );
}
