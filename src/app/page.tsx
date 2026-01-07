'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Components that paint the canvas
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityStory from '@/components/IdentityStory';
import LookBook from '@/components/LookBook';
import ContactSection from '@/components/ContactSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // Step 3: Bold Shape Animations (Floating motion)
    gsap.to('.hero-shape', {
      y: 20,
      rotation: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.2
    });
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="hero-shape absolute w-32 h-32 bg-[#e63946] rounded-full top-20 left-10 opacity-80" />
        <div className="hero-shape absolute w-48 h-12 bg-[#457b9d] bottom-40 right-10" />
        
        <div className="z-10 text-center">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 leading-none uppercase">
            RAGUIROMO STORE
          </h1>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400">
            Bauhaus-Inspired Minimalist Collection
          </p>
        </div>
      </section>

      <IdentityStory />
      <ProductGrid />
      <LookBook />
      <ContactSection />
    </main>
  );
}

