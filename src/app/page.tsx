'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Import all sections to ensure the "Canvas" isn't empty
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityStory from '@/components/IdentityStory';
import LookBook from '@/components/LookBook';
import ContactSection from '@/components/ContactSection';
import IdentityPop from '@/components/IdentityPop';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
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

  // Prevent the "White Screen" by waiting for the client to mount
  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <IdentityPop />
      
      {/* Hero Section */}
      <section className="h-[90vh] flex flex-col items-center justify-center relative px-6 text-center overflow-hidden">
        <div className="hero-shape absolute w-32 h-32 bg-[#e63946] rounded-full top-[15%] left-[10%] opacity-90" />
        <div className="hero-shape absolute w-48 h-12 bg-[#457b9d] bottom-[25%] right-[5%]" />
        
        <div className="z-10">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 uppercase leading-none">
            Design. Create.<br />Innovate.
          </h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-400">
            Bauhaus-Inspired Minimalist Collection
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <IdentityStory />
      <div id="registry">
        <ProductGrid />
      </div>
      <LookBook />
      <ContactSection />
    </main>
  );
}
