'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function IdentityPop() {
  const [isOpen, setIsOpen] = useState(false);

  // Automatically show the popup after a brief delay for new visitors
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg border border-black bg-white p-12 text-center shadow-2xl">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-black hover:opacity-50 transition-opacity"
          aria-label="Close"
        >
          <X className="w-5 h-5 stroke-[1px]" />
        </button>

        <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-8">
          The Registry
        </h2>
        
        <p className="text-xl font-light mb-8 italic">
          "Each identity is an artifact of pure structure."
        </p>

        <p className="text-xs leading-relaxed text-gray-600 mb-12 font-light">
          You are invited to join the RGRM Identity Registry. Secure your bespoke digital certificate and archive your essence within our minimalist collection.
        </p>

        <button 
          onClick={() => setIsOpen(false)}
          className="bg-black text-white px-10 py-3 text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-all"
        >
          Enter Archive
        </button>
      </div>
    </div>
  );
}
