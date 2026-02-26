'use client';

import React, { useState } from 'react';
import { useCart, CartItem } from '@/context/CartContext';

interface AddToCartProps {
  item: CartItem;
  disabled?: boolean;
}

export default function AddToCartButton({ item, disabled = false }: AddToCartProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAcquire = () => {
    if (disabled) return;

    // 1. Add to Global State
    addToCart(item);

    // 2. Trigger Visual Feedback
    setIsAdded(true);

    // 3. Reset after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // --- RENDER: DISABLED STATE (Sold Out) ---
  if (disabled) {
    return (
      <button 
        disabled 
        className="w-full py-6 border border-white/10 bg-white/5 text-white/30 cursor-not-allowed uppercase font-bold tracking-[0.3em] text-xs transition-colors"
      >
        Acquisition Unavailable
      </button>
    );
  }

  // --- RENDER: ACTIVE STATE ---
  return (
    <button
      onClick={handleAcquire}
      disabled={isAdded}
      className={`
        group relative w-full py-6 overflow-hidden transition-all duration-300
        text-xs font-bold uppercase tracking-[0.3em]
        ${isAdded 
          ? 'bg-rgrm-red text-white border border-rgrm-red' 
          : 'bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white'
        }
      `}
    >
      {/* Background Slide Effect (Only on hover, when not added) */}
      {!isAdded && (
        <span className="absolute inset-0 w-full h-full bg-rgrm-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
      )}

      {/* Button Text Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isAdded ? (
          <>
            <span>Unit Secured</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </>
        ) : (
          <>
            <span className="group-hover:hidden">Initialize Acquisition</span>
            <span className="hidden group-hover:inline text-white">Confirm Selection</span>
          </>
        )}
      </span>

    </button>
  );
}
