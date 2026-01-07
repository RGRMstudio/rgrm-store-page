'use client';

import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';

function SuccessContent() {
  useEffect(() => {
    // Premium reveal animation for the success message
    const tl = gsap.timeline();
    tl.from('.success-header', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5
    }).from('.success-details', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    }, "-=0.4");
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <div className="success-header">
        <div className="w-20 h-20 bg-[#e63946] rounded-full mx-auto mb-8 flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 uppercase">
          Identity<br />Registered.
        </h1>
      </div>

      <div className="success-details max-w-md">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-12 leading-relaxed">
          Your digital artifact has been logged into the RGRM Registry. 
          A confirmation email with your certificate details is being generated.
        </p>
        
        <Link href="/" className="inline-block border border-black px-12 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300">
          Return to Archive
        </Link>
      </div>

      {/* Background Bauhaus Element */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#457b9d] opacity-5 -z-10 translate-x-1/2 translate-y-1/2" />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
