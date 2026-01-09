'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityPop from '@/components/IdentityPop';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Open the gate once the browser is ready
    setIsReady(true);

    if (typeof window !== 'undefined') {
      const tl = gsap.timeline();
      
      // Bauhaus Fade-in
      tl.from('.hero-content', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out'
      });

      // Subtle motion for background shapes
      gsap.to('.bauhaus-shape', {
        y: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2
      });
    }
  }, []);

  // Show a clean white background during the initial "boot up"
  if (!isReady) return <div className="min-h-screen bg-white" />;

  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />
      <IdentityPop />

      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
        
        {/* Background Geometric Elements */}
        <div className="bauhaus-shape absolute top-[15%] left-[10%] w-32 h-32 bg-[#e63946] rounded-full opacity-10 -z-10" />
        <div className="bauhaus-shape absolute bottom-[20%] right-[8%] w-56 h-14 bg-[#457b9d] opacity-10 -z-10" />

        <div className="hero-content z-10 max-w-5xl">
          <h1 className="text-7xl md:text-[9rem] font-bold tracking-tighter uppercase leading-none mb-4">
            RGRM<br />STUDIO
          </h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-20">
            Digital Identity Registry — Edition 2026
          </p>

          <div className="w-full">
            <ProductGrid />
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-gray-100 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300">
          © 2026 RAGUIROMO — ALL RIGHTS REGISTERED
        </p>
      </footer>
    </main>
  );
}
