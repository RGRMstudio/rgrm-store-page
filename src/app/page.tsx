'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ProductGrid from '@/components/ProductGrid';
import Navbar from '@/components/Navbar';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // Step 3: Bold Shape Animations (Floating and Rotating)
    gsap.to('.hero-shape', {
      y: 30,
      rotation: 15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.3
    });

    // Step 4: Hero Text Animations (Slide and Fade)
    gsap.from('.hero-text', {
      opacity: 0,
      y: 60,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.5
    });

    // Step 6: Scroll-Based Motion (Reveal on Scroll)
    gsap.from('.scroll-reveal', {
      scrollTrigger: {
        trigger: '.scroll-reveal',
        start: 'top 85%',
      },
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: 'power2.out'
    });
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      
      {/* Step 1: Static Hero Base */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        {/* Layer 1 & 3: Geometric Shapes */}
        <div className="hero-shape absolute w-32 h-32 bg-[#e63946] rounded-full top-20 left-10 opacity-80" />
        <div className="hero-shape absolute w-48 h-12 bg-[#457b9d] bottom-40 right-10" />
        
        <div className="hero-text z-10">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 leading-none">
            Design. Create.<br />Innovate.
          </h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-12">
            Bauhaus-Inspired Minimalist Collection
          </p>
          <button className="bg-black text-white px-12 py-4 text-[10px] uppercase tracking-widest hover:scale-105 transition-transform duration-200">
            Explore Archive
          </button>
        </div>
      </section>

      <div className="scroll-reveal">
        <ProductGrid />
      </div>
    </main>
  );
}
