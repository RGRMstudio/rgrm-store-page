'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted) {
      gsap.from('.success-box', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.2
      });
    }
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-yellow-400 flex items-center justify-center p-6">
      <div className="success-box max-w-2xl w-full bg-white border-[12px] border-black p-12 shadow-[24px_24px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-7xl font-black uppercase leading-none tracking-tighter">
            Order<br/><span className="text-red-600">Verified</span>
          </h1>
          <div className="w-16 h-16 bg-blue-600 border-4 border-black rounded-full animate-bounce" />
        </div>

        <div className="border-t-4 border-black pt-6 mb-8">
          <p className="text-2xl font-bold mb-2">Thank you for your acquisition.</p>
          <p className="text-lg font-medium opacity-70 break-all">
            Registry ID: {sessionId ? sessionId.slice(0, 20) + '...' : 'AUTHENTICATED'}
          </p>
        </div>

        <div className="bg-black text-white p-6 mb-8">
          <p className="leading-relaxed">
            Your design artifact is now being prepared at **Printful Store 002**. 
            A confirmation has been dispatched to your digital address.
          </p>
        </div>

        <Link href="/" className="inline-block bg-blue-600 text-white border-4 border-black px-10 py-4 font-black text-xl hover:bg-yellow-400 hover:text-black transition-all uppercase tracking-widest">
          Return to Studio
        </Link>
      </div>
    </main>
  );
}
