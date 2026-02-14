import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      {/* RGRM Loading Indicator */}
      <div className="w-16 h-16 border-t-2 border-[#BC2026] border-r-2 border-transparent rounded-full animate-spin mb-8"></div>
      
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-black uppercase tracking-[0.3em] text-white font-[family-name:var(--font-headline)]">
          RGRM Studio
        </h2>
        <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 animate-pulse">
          Calibrating Structural Integrity...
        </p>
      </div>

      {/* Aesthetic Border Accents */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[#BC2026] via-transparent to-transparent"></div>
      <div className="fixed bottom-0 right-0 w-full h-1 bg-gradient-to-l from-[#BC2026] via-transparent to-transparent"></div>
    </div>
  );
}
