'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityPop from '@/components/IdentityPop';

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Bauhaus Animation Logic
    gsap.to('.hero-shape', {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.2
    });
  }, []);

  // Prevents the "White Screen" during initial load
  if (!hasMounted) return <div className="min-h-screen bg-white" />;

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <Navbar />
      <IdentityPop />

      {/* Hero Section */}
      <section className="h-[90vh] flex flex-col items-center justify-center text-center px-6">
        {/* Background Shapes */}
        <div className="hero-shape absolute top-20 left-10 w-32 h-32 bg-[#e63946] rounded-full opacity-10" />
        <div className="hero-shape absolute bottom-20 right-10 w-48 h-12 bg-[#457b9d] opacity-10" />

        <div className="z-10">
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase mb-4 leading-none">
            RGRM<br />STUDIO
          </h1>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-12">
            Bauhaus Minimalist Registry — Edition 2026
          </p>
          <div className="max-w-5xl mx-auto">
            <ProductGrid />
          </div>
        </div>
      </section>
    </main>
  );
}
