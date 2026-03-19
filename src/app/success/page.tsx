// app/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    // Verify the session with our backend
    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'complete') {
          setCustomerEmail(data.email);
          setStatus('success');
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* Loading State */}
      {status === 'loading' && (
        <div className="text-center space-y-6">
          <div className="w-1 h-16 bg-rgrm-red mx-auto animate-pulse" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-mono">
            Verifying acquisition...
          </p>
        </div>
      )}

      {/* Success State */}
      {status === 'success' && (
        <div className="text-center space-y-8 max-w-lg">

          {/* Signal dot */}
          <div className="flex justify-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rgrm-red opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rgrm-red" />
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <p className="text-rgrm-red text-[10px] font-mono tracking-widest uppercase">
              Acquisition Confirmed
            </p>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Structure<br />Acquired.
            </h1>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10" />

          {/* Message */}
          <div className="space-y-4 text-left border-l-2 border-white/20 pl-6">
            <p className="text-white/60 text-sm leading-relaxed">
              Your order has been received and sent to production.
              Every piece is made to order — crafted specifically for you.
            </p>
            {customerEmail && (
              <p className="text-white/40 text-xs font-mono">
                Confirmation sent to{' '}
                <span className="text-white">{customerEmail}</span>
              </p>
            )}
          </div>

          {/* What happens next */}
          <div className="bg-white/5 border border-white/10 p-6 text-left space-y-4">
            <p className="text-[9px] uppercase tracking-widest text-white/40 font-mono font-bold">
              What happens now
            </p>
            <div className="space-y-3">
              {[
                { step: '01', text: 'Printful begins production of your piece' },
                { step: '02', text: 'You receive a shipping confirmation email' },
                { step: '03', text: 'Your garment arrives in 5–10 business days' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <span className="text-rgrm-red font-mono text-[10px] font-bold mt-0.5">
                    {item.step}
                  </span>
                  <p className="text-white/60 text-xs uppercase tracking-wider">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link
              href="/selection"
              className="flex-1 text-center px-6 py-4 border border-white/20 text-[10px] uppercase tracking-widest font-bold text-white/60 hover:border-white hover:text-white transition-all duration-300"
            >
              Back to Gallery
            </Link>
            <Link
              href="/"
              className="flex-1 text-center px-6 py-4 border border-rgrm-red text-[10px] uppercase tracking-widest font-bold text-rgrm-red hover:bg-rgrm-red hover:text-white transition-all duration-300"
            >
              Return to Studio
            </Link>
          </div>

          {/* Fine print */}
          <p className="text-white/20 text-[9px] uppercase tracking-widest font-mono">
            Order ID: {sessionId?.slice(-8).toUpperCase()}
          </p>

        </div>
      )}

      {/* Error State */}
      {status === 'error' && (
        <div className="text-center space-y-8 max-w-lg">
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Something went wrong.
          </h1>
          <p className="text-white/40 text-sm">
            Your payment may have gone through. Please check your email
            for a confirmation, or contact us directly.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 border border-white text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-300"
          >
            Return to Studio
          </Link>
        </div>
      )}

    </main>
  );
}
