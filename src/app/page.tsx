'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Import all sections we've worked on
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityStory from '@/components/IdentityStory';
import LookBook from '@/components/LookBook';
import ContactSection from '@/components/ContactSection';
import SocialGallery from '@/components/SocialGallery';
import IdentityPop from '@/components/IdentityPop';

// Register GSAP plugins for scroll effects
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

    // Step 4: Hero Text Slide-in Reveal
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

    // Step 6: Reveal sections as the user scrolls
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
      {/* Universal Components */}
      <Navbar />
      <IdentityPop />

      {/* Hero Section: The Bauhaus Canvas */}
      <section className="h-[90vh] flex flex-col items-center justify-center relative px-6 text-center overflow-hidden">
        {/* Animated Background Geometric Elements */}
        <div className="hero-shape absolute w-32 h-32 bg-[#e63946] rounded-full top-[15%] left-[10%] opacity-90 z-0" />
        <div className="hero-shape absolute w-48 h-12 bg-[#457b9d] bottom-[25%] right-[5%] z-0" />
        <div className="hero-shape absolute w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-[#ffd166] top-[25%] right-[15%] z-0" />

        <div className="hero-content z-10">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 leading-none uppercase">
            Design. Create.<br />Innovate.
          </h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-12">
            The RGRM Minimalist Registry
          </p>
          <button 
            onClick={() => document.getElementById('registry')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] hover:invert transition-all duration-300"
          >
            Explore the Series
          </button>
        </div>

        {/* Floating Scroll Cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-gray-300 animate-pulse">
          Scroll to Begin
        </div>
      </section>

      {/* Boutique Content Sections */}
      <div id="registry" className="scroll-section">
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

      <footer className="py-20 text-center border-t border-gray-50">
        <p className="text-[9px] uppercase tracking-[0.5em] text-gray-300">
          © 2026 RAGUIROMO STUDIO — ALL RIGHTS RESERVED
        </p>
      </footer>
    </main>
  );
}
