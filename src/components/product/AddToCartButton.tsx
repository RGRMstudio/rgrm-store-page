'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

/**
 * RGRM // ACQUISITION_TRIGGER
 * Protocol: Manual Registry Entry
 */

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
}

export default function AddToCartButton({ product }: ProductProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [status, setStatus] = useState<'IDLE' | 'SYNCING'>('IDLE');

  const handleAcquire = async () => {
    // 1. Initialize Sync State
    setStatus('SYNCING');

    // 2. Execute Registry Entry
    // We wrap this in a small timeout to simulate the "Processing" aesthetic of RGRM
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });

      // 3. Open the Manifest Drawer
      setIsCartOpen(true);
      setStatus('IDLE');
    }, 600);
  };

  return (
    <div className="w-full relative group">
      {/* Decorative Glitch Border */}
      <div className="absolute -inset-0.5 bg-rgrm-red opacity-0 group-hover:opacity-20 transition-opacity blur-[2px]" />
      
      <button 
        onClick={handleAcquire}
        disabled={status === 'SYNCING'}
        className={`
          relative w-full py-4 px-8 text-xs font-black uppercase tracking-[0.2em]
          transition-all duration-300 border border-white/10
          ${status === 'SYNCING' 
            ? 'bg-white text-black cursor-wait' 
            : 'bg-rgrm-red text-white hover:bg-white hover:text-black active:scale-[0.98]'
          }
          disabled:opacity-80
        `}
      >
        <span className="flex items-center justify-center gap-2">
          {status === 'SYNCING' ? (
            <>
              <span className="animate-pulse">●</span>
              INITIALIZING_REGISTRY...
            </>
          ) : (
            'Acquire_Study'
          )}
        </span>
      </button>

      {/* Technical Metadata Underline */}
      <div className="mt-2 flex justify-between items-center opacity-20 group-hover:opacity-40 transition-opacity">
        <span className="text-[8px] font-mono uppercase tracking-tighter">Auth_Required: [TRUE]</span>
        <span className="text-[8px] font-mono uppercase tracking-tighter">Object_ID: {product.id.substring(0, 8)}</span>
      </div>
    </div>
  );
}
