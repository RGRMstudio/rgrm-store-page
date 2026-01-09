'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityPop from '@/components/IdentityPop';

export default function Home() {
  // THE GATEKEEPER STATE
  // This starts as 'false', meaning we show a clean white screen 
  // until the browser is 100% ready to handle the JavaScript.
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Once the component mounts in the browser, we open the gate
    setIsReady(true);

    // Initial Bauhaus Animations
    if (typeof window !== 'undefined') {
      gsap.from('.hero-content', {
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5
      });

      gsap.to('.bauhaus-shape', {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2
      });
    }
  }, []);

  // If the gate is closed, return a clean white canvas. 
  // This prevents the "White Screen of Death" caused by hydration crashes.
  if (!isReady) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />
      <IdentityPop />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
        
        {/* Animated Background Elements */}
        <div className="bauhaus-shape absolute top-[20%] left-[10%] w-32 h-32 bg-[#e63946] rounded-full opacity-10 -z-10" />
        <div className="bauhaus-shape absolute bottom-[30%] right-[10%] w-48 h-12 bg-[#457b9d] opacity-10 -z-10" />
        
        <div className="hero-content z-10">
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase mb-6 leading-none">
            RGRM<br />STUDIO
          </h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-16">
            Digital Identity Registry — Edition 2026
          </p>

          {/* This renders your artifacts and Stripe purchase buttons */}
          <div className="max-w-6xl mx-auto">
            <ProductGrid />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300">
          © 2026 RAGUIROMO — ALL RIGHTS REGISTERED
        </p>
      </footer>
    </main>
  );
}
