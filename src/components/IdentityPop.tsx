'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export default function IdentityPop() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className="identity-pop-container p-8 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-4xl font-black uppercase mb-4">Bauhaus Registry</h2>
      <p className="text-lg leading-relaxed mb-6">
        Welcome to the RaGuiRoMo store. You&apos;re currently viewing the identity 
        registry module. Here, every creation isn&apos;t just a product; it&apos;s a 
        piece of the Bauhaus legacy redesigned for the modern era.
      </p>
      <div className="flex gap-4">
        <button className="bg-yellow-400 border-2 border-black px-6 py-2 font-bold hover:bg-black hover:text-white transition-colors">
          EXPLORE
        </button>
        <button className="bg-red-500 text-white border-2 border-black px-6 py-2 font-bold hover:bg-white hover:text-black transition-colors">
          CLOSE
        </button>
      </div>
    </div>
  );
}
