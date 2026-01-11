'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityPop from '@/components/IdentityPop';
import IdentityStory from '@/components/IdentityStory';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // RESOLUTION: The timeout ensures the initial paint finishes before
    // triggering the state update, breaking the cascading render loop.
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    // Initialize GSAP animations only after mounting
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
        gsap.fromTo('.hero-text', 
          { opacity: 0, y: 50 }, 
          { opacity: 1, y: 0, duration: 1, ease: 'power4.out', delay: 0.5 }
        );
      });
      
      return () => {
        clearTimeout(timeout);
        ctx.revert(); // Clean up GSAP context on unmount
      };
    }

    return () => clearTimeout(timeout);
  }, []);

  // Hydration Guard: Matches the server-rendered HTML initially 
  // to avoid 'Hydration Mismatch' errors.
  if (!isMounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <main className="relative min-h-screen bg-white text-black overflow-x-hidden selection:bg-[#e63946] selection:text-white">
      <Navbar />
      
      <div className="pt-32 px-6">
        <IdentityPop />
        
        <header className="hero-text mt-20 mb-32 max-w-5xl">
          <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-[0.85] italic">
            RGRM<br />STUDIO
          </h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mt-6">
            Minimalist Digital Identity Registry — Edition 2026
          </p>
        </header>

        <section className="mb-40">
          <ProductGrid />
        </section>
      </div>

      <IdentityStory />

      <footer className="py-20 border-t border-gray-100 text-center bg-white">
        <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300">
          © 2026 RAGUIROMO — ALL RIGHTS REGISTERED
        </p>
      </footer>
    </main>
  );
}
