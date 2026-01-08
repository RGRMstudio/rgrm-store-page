'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityPop from '@/components/IdentityPop';
import gsap from 'gsap';

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Bauhaus Shape Animation
    gsap.to('.hero-shape', {
      y: 20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  // If the browser isn't ready, show a white screen briefly to prevent crashing
  if (!hasMounted) return <div className="min-h-screen bg-white" />;

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <Navbar />
      <IdentityPop />

      <section className="h-screen flex flex-col items-center justify-center text-center px-4">
        {/* Bauhaus Geometric Shapes */}
        <div className="hero-shape absolute top-20 left-10 w-32 h-32 bg-[#e63946] rounded-full opacity-20" />
        <div className="hero-shape absolute bottom-20 right-10 w-40 h-10 bg-[#457b9d] opacity-20" />

        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
          RGRM<br />STUDIO
        </h1>
        <p className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-12">
          Bauhaus Minimalist Registry
        </p>
        
        <div className="w-full max-w-5xl mx-auto">
          <ProductGrid />
        </div>
      </section>
    </main>
  );
}
