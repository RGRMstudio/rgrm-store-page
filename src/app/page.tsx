'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Import your existing Bauhaus components
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityPop from '@/components/IdentityPop';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // 1. Set mounted to true to reveal the UI
    setHasMounted(true);
    
    // 2. Initialize Bauhaus Animations
    const tl = gsap.timeline();
    
    // Animate Hero Shapes
    gsap.to('.hero-shape', {
      y: 30,
      rotation: 15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.3
    });

    // Reveal Header Text
    tl.from('.hero-title', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.5
    });

  }, []);

  // HYDRATION GUARD: This prevents the "White Screen of Death" 
  // by waiting for the browser to be ready before rendering JS-heavy elements.
  if (!hasMounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />
      <IdentityPop />

      {/* Hero Section: The Bauhaus Canvas */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center px-6 text-center">
        
        {/* Animated Background Geometric Elements */}
        <div className="hero-shape absolute w-32 h-32 bg-[#e63946] rounded-full top-[15%] left-[10%] opacity-20 -z-10" />
        <div className="hero-shape absolute w-48 h-12 bg-[#457b9d] bottom-[25%] right-[5%] -z-10" />
        <div className="hero-shape absolute w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-[#ffd166] top-[25%] right-[15%] -z-10" />

        <div className="hero-title">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 leading-none uppercase">
            RAGUIROMO
          </h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-12">
            Bauhaus-Inspired Minimalist Registry
          </p>
          
          <button 
            onClick={() => document.getElementById('store')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-black px-10 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500"
          >
            Explore Artifacts
          </button>
        </div>
      </section>

      {/* Main Store Content */}
      <section id="store" className="py-20 max-w-7xl mx-auto px-6">
        <ProductGrid />
      </section>

      <footer className="py-20 text-center border-t border-gray-100">
        <p className="text-[9px] uppercase tracking-[0.5em] text-gray-300">
          © 2026 RAGUIROMO STUDIO — ALL RIGHTS REGISTERED
        </p>
      </footer>
    </main>
  );
}
