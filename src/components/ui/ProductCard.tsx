import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// --- 1. TYPE DEFINITIONS ---
interface ProductProps {
  id: string;
  name: string;
  price: number;
  status: string; // 'AVAILABLE' | 'LOW STOCK' | 'SOLD OUT'
  image: string;  // The fully resolved URL string
}

export default function ProductCard({ id, name, price, status, image }: ProductProps) {
  const isSoldOut = status === 'SOLD OUT';
  const isLowStock = status === 'LOW STOCK';

  return (
    <Link 
      href={`/selection/${id}`} 
      className={`group relative block border border-white/10 bg-black overflow-hidden transition-all duration-300 hover:border-rgrm-red ${isSoldOut ? 'opacity-60 grayscale' : ''}`}
    >
      
      {/* --- 2. IMAGE CONTAINER --- */}
      <div className="aspect-[3/4] relative w-full overflow-hidden bg-neutral-900 border-b border-white/5">
        
        {/* The Image itself */}
        {image ? (
          <Image 
            src={image} 
            alt={name} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          // Fallback if image is missing/broken
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/10 font-black text-4xl rotate-[-45deg] select-none">
              NO_IMG
            </span>
          </div>
        )}

        {/* Status Overlay (Only shows if NOT Available) */}
        {status !== 'AVAILABLE' && (
          <div className="absolute top-2 right-2 bg-black/90 backdrop-blur-sm border border-white/20 px-2 py-1 z-10">
            <span className={`text-[9px] font-bold tracking-widest uppercase ${isLowStock ? 'text-yellow-500' : 'text-white/50'}`}>
              {status}
            </span>
          </div>
        )}

        {/* Hover Overlay Gradient (Subtle darken on hover) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* --- 3. DATA PANEL --- */}
      <div className="p-4 relative bg-black">
        
        {/* Top Row: ID & Price */}
        <div className="flex justify-between items-start mb-1">
          <p className="text-[9px] text-rgrm-red font-mono tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
            {id}
          </p>
          <p className="text-xs font-bold font-mono text-white tracking-widest">
            ${price}
          </p>
        </div>

        {/* Bottom Row: Name */}
        <div className="relative overflow-hidden h-8"> 
          {/* Normal State: The Name */}
          <h3 className="text-sm font-bold uppercase tracking-tighter leading-none text-white/90 transition-transform duration-300 group-hover:-translate-y-full">
            {name}
          </h3>

          {/* Hover State: The Call to Action (Slides up) */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isSoldOut ? 'text-white/30' : 'text-rgrm-red'}`}>
              {isSoldOut ? 'ARCHIVED' : 'ACQUIRE >>'}
            </span>
          </div>
        </div>

      </div>

      {/* --- 4. CORNER DECORATION (Optional Technical Detail) --- */}
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-rgrm-red transition-colors duration-300" />

    </Link>
  );
}
