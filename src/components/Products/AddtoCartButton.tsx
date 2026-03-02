'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

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

  const handleAcquire = () => {
    setStatus('SYNCING');
    addToCart(product);
    
    setTimeout(() => {
      setStatus('IDLE');
      setIsCartOpen(true);
    }, 600);
  };

  return (
    <button 
      onClick={handleAcquire}
      disabled={status === 'SYNCING'}
      className="w-full bg-rgrm-red text-white py-4 px-8 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
    >
      {status === 'SYNCING' ? 'INITIALIZING_REGISTRY...' : 'Acquire_Study'}
    </button>
  );
}
