'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityPop from '@/components/IdentityPop';

export default function Home() {
  /**
   * THE GATEKEEPER
   * Prevents "White Screen" by ensuring the browser is fully loaded 
   * before rendering JavaScript-heavy Bauhaus elements.
   */
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);

    // Initial Animation Sequence
    if (typeof window !== 'undefined') {
      const tl = gsap.timeline();
      
      tl.from('.hero-text', {
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: 'power4.out',
        stagger: 0.2
      });

      // Subtle float for Bauhaus shapes
      gsap.to('.bauhaus-shape', {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3
      });
    }
  }, []);

  // Show a clean white canvas until the browser is ready
  if (!isReady) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <main className="relative min-h-screen bg-white overflow-hidden selection:bg-[#e63946] selection:text-white">
      <Navbar />
      
      {/* Identity Registration Popup */}
      <IdentityPop />

      {/* Hero / Canvas Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
        
        {/* Geometric Background Elements (Z-indexed behind content) */}
        <div className="bauhaus-shape absolute top-[15%] left-[8%] w-32 h-32 bg-[#e63946] rounded-full opacity-10 -z-10" />
        <div className="bauhaus-shape absolute bottom-[25%] right-[5%] w-64 h-16 bg-[#457b9d] opacity-10 -z-10" />
        <div className="bauhaus-shape absolute top-[40%] right-[15%] w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-[#ffd166] opacity-10 -z-10" />

        <div className="max-w-4xl">
          <h1 className="hero-text text-7xl md:text-[10rem] font-bold tracking-tighter uppercase leading-[0.85] mb-6">
            RGRM<br />STUDIO
          </h1>
          
          <p className="hero-text text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-16">
            Minimalist Digital Identity Registry — Ed. 2026
          </p>

          {/* The Artifact Grid & Stripe Checkout Logic */}
          <div className="hero-text w-full">
            <ProductGrid />
          </div>
        </div>
      </section>

      {/* Aesthetic Footer */}
      <footer className="py-24 border-t border-gray-100 text-center">
        <p className="text-[9px] uppercase tracking-[0.5em] text-gray-300">
          © 2026 RAGUIROMO — AUTHENTICITY GUARANTEED
        </p>
      </footer>
    </main>
  );
}
