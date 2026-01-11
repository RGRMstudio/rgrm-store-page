'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityPop from '@/components/IdentityPop';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 1. requestAnimationFrame prevents the "Cascading Render" Error
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    // 2. We only run animations if we are in the browser and mounted
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
        // Entrance Animation
        const tl = gsap.timeline();
        tl.fromTo('.hero-content', 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.2 }
        );

        // Floating Bauhaus Shapes
        gsap.to('.bauhaus-shape', {
          y: 20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.3
        });
      });

      // Cleanup function to prevent memory leaks or animation bugs
      return () => {
        cancelAnimationFrame(frame);
        ctx.revert();
      };
    }
  }, []);

  // Hydration Guard: Matches the server's empty state initially
  if (!isMounted) return <div className="min-h-screen bg-white" />;

  return (
    <main className="relative min-h-screen bg-white overflow-hidden selection:bg-[#e63946] selection:text-white">
      <Navbar />
      
      {/* Ensure IdentityPop is updated with the &apos; fix we did earlier */}
      <IdentityPop />

      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
        
        {/* Background Decorative Elements */}
        <div className="bauhaus-shape absolute top-[15%] left-[10%] w-32 h-32 bg-[#e63946] rounded-full opacity-10 -z-10" />
        <div className="bauhaus-shape absolute bottom-[20%] right-[8%] w-56 h-14 bg-[#457b9d] opacity-10 -z-10" />

        <div className="hero-content z-10 max-w-5xl">
          <h1 className="text-7xl md:text-[9rem] font-bold tracking-tighter uppercase leading-none mb-4">
            RGRM<br />STUDIO
          </h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-20">
            Minimalist Digital Identity Registry — Edition 2026
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
