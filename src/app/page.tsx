'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Components
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityStory from '@/components/IdentityStory';
import LookBook from '@/components/LookBook';
import ContactSection from '@/components/ContactSection';
import SocialGallery from '@/components/SocialGallery';
import IdentityPop from '@/components/IdentityPop';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // Step 3: Bold Shape Animations (Floating/Rotation)
    gsap.to('.hero-shape', {
      y: 20,
      rotation: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.2
    });

    // Step 4: Hero Text Animations (Slide and Fade-in)
    const tl = gsap.timeline();
    tl.from('.hero-content h1', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5
    }).from('.hero-content p', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    }, "-=0.5");

    // Step 6: Scroll-Based Motion (Reveal on Scroll)
    const sections = gsap.utils.toArray('.scroll-section');
    sections.forEach((section: any) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power2.out'
      });
    });
  }, []);

  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Step 1: Static Layout Header */}
      <Navbar />
      <IdentityPop />

      {/* Hero Section - Following Motion Plan Roadmap */}
      <section className="h-[90vh] flex flex-col items-center justify-center relative px-6 text-center overflow-hidden">
        {/* Step 3: Geometric Background Elements */}
        <div className="hero-shape absolute w-32 h-32 bg-[#e63946] rounded-full top-[15%] left-[10%] opacity-90 z-0" />
        <div className="hero-shape absolute w-48 h-12 bg-[#457b9d] bottom-[25%] right-[5%] z-0" />
        <div className="hero-shape absolute w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-[#ffd166] top-[25%] right-[15%] z-0" />

        <div className="hero-content z-10">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 leading-none">
            Design. Create.<br />Innovate.
          </h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-500 mb-12">
            Bauhaus-Inspired Minimalist Collection
          </p>
          <button 
            onClick={() => document.getElementById('store')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-transform duration-200"
          >
            Get Started
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-gray-300 animate-pulse">
          Scroll Down
        </div>
      </section>

      {/* Step 6: Scroll-Based Content Sections */}
      <div id="store" className="scroll-section">
        <IdentityStory />
      </div>

      <div className="scroll-section">
        <ProductGrid />
      </div>

      <div className="scroll-section">
        <LookBook />
      </div>

      <div className="scroll-section">
        <SocialGallery />
      </div>

      <div className="scroll-section">
        <ContactSection />
      </div>

      <footer className="py-12 text-center border-t border-gray-50">
        <p className="text-[9px] uppercase tracking-[0.5em] text-gray-300">
          © 2026 RAGUIROMO STUDIO — ALL RIGHTS RESERVED
        </p>
      </footer>
    </main>
  );
}
