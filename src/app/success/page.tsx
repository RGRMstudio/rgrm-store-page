'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (sessionId) {
      // Optional: Verify the session with your backend
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setStatus('success');
          } else {
            setStatus('error');
          }
        })
        .catch(() => setStatus('error'));
    }
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl font-mono">Verifying your order...</p>
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-400 font-mono">⚠️ Could not verify order. Please contact support.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 flex items-center justify-center">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-[#BC2026]">
          Order Confirmed
        </h1>
        <p className="text-gray-400 mb-8">
          Thank you for your purchase! Your order is being processed and will ship soon.
        </p>
        <p className="text-sm font-mono text-gray-500 mb-8">
          Session ID: {sessionId?.slice(0, 8)}...
        </p>
        <a
          href="/selection"
          className="inline-block bg-white/10 hover:bg-white/20 px-6 py-3 uppercase font-bold transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    </main>
  );
}
