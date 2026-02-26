'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartTrigger() {
  const { toggleCart, cartCount } = useCart();
  const [isBumped, setIsBumped] = useState(false);

  // Animation effect when cart count changes
  useEffect(() => {
    if (cartCount === 0) return;
    setIsBumped(true);
    const timer = setTimeout(() => setIsBumped(false), 300);
    return () => clearTimeout(timer);
  }, [cartCount]);

  return (
    <button 
      onClick={toggleCart}
      className="fixed top-6 right-6 z-50 flex items-center gap-3 group mix-blend-difference text-white"
      aria-label="Open Manifest"
    >
      
      {/* --- 1. TEXT LABEL (Desktop Only) --- */}
      <div className="text-right hidden md:block">
        <span className="block text-[8px] uppercase tracking-[0.2em] opacity-60 group-hover:text-rgrm-red group-hover:opacity-100 transition-all duration-300">
          Manifest
        </span>
        <span className={`block text-[10px] font-bold font-mono transition-transform duration-100 ${isBumped ? 'scale-110 text-rgrm-red' : 'text-white'}`}>
          {cartCount.toString().padStart(2, '0')} UNITS
        </span>
      </div>
      
      {/* --- 2. ICON GRAPHIC --- */}
      <div className="relative w-10 h-10 border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
        
        {/* The Icon (A technical 'List' symbol) */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={1.5}
        >
          <path strokeLinecap="square" strokeLinejoin="miter" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        {/* Red Dot Notification (Mobile Only - since text is hidden) */}
        {cartCount > 0 && (
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rgrm-red md:hidden">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-rgrm-red opacity-75"></span>
            <span className="relative inline-flex w-2.5 h-2.5 bg-rgrm-red"></span>
          </div>
        )}
      </div>

    </button>
  );
}
