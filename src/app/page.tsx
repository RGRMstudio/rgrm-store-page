'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityPop from '@/components/IdentityPop';

export default function Home() {
  // THE GATEKEEPER
  // This state ensures the browser is fully ready before GSAP or Stripe logic runs.
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);

    if (typeof window !== 'undefined') {
      const tl = gsap.timeline();
      
      // Bauhaus Reveal Animation
      tl.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power4.out'
      });

      // Animated background shapes
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

  // Prevents the "White Screen of Death" during server-side hydration
  if (!isReady) return <div className="min-h-screen bg-white" />;

  return (
    <main className="relative min-h-screen bg-white overflow-hidden selection:bg-[#e63946] selection:text-white">
      <Navbar />
      <IdentityPop />

      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
        
        {/* Background Geometric Elements */}
        <div className="bauhaus-shape absolute top-[15%] left-[8%] w-32 h-32 bg-[#e63946] rounded-full opacity-10 -z-10" />
        <div className="bauhaus-shape absolute bottom-[25%] right-[5%] w-64 h-16 bg-[#457b9d] opacity-10 -z-10" />

        <div className="hero-content max-w-4xl z-10">
          <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter uppercase leading-[0.85] mb-6">
            RGRM<br />STUDIO
          </h1>
          
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-16">
            Minimalist Digital Identity Registry — Ed. 2026
          </p>

          <div className="w-full">
            <ProductGrid />
          </div>
        </div>
      </section>

      <footer className="py-24 border-t border-gray-100 text-center">
        <p className="text-[9px] uppercase tracking-[0.5em] text-gray-300">
          © 2026 RAGUIROMO — AUTHENTICITY GUARANTEED
        </p>
      </footer>
    </main>
  );
}
