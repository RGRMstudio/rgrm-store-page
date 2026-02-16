'use client';

import React from 'react';
import Link from 'next/link';
import { RGRM_IDENTITY, RGRM_PHASES, RGRM_CHANNELS } from '@/lib/constants';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col selection:bg-[#BC2026]">
      {/* STRUCTURAL HEADER */}
      <nav className="p-6 flex justify-between items-center blueprint-border border-t-0 border-x-0">
        <span className="font-black tracking-tighter text-xl">{RGRM_IDENTITY.shortName}</span>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold">
          <Link href="/selection" className="hover:text-rgrm-red transition-colors">Studies</Link>
          <Link href="/selection/register" className="hover:text-rgrm-red transition-colors">Registry</Link>
        </div>
      </nav>

      {/* HERO SECTION: THE MANIFESTO */}
      <section className="flex-grow flex flex-col justify-center px-6 md:px-24 py-24 relative overflow-hidden">
        <div className="max-w-4xl space-y-8 z-10">
          <p className="text-rgrm-red text-xs font-bold uppercase tracking-[0.5em] animate-pulse">
            Status: {RGRM_PHASES.current.status} // Phase {RGRM_PHASES.current.id}
          </p>
          
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] font-[family-name:var(--font-headline)]">
            {RGRM_PHASES.current.name}
          </h1>

          <p className="text-sm md:text-xl uppercase tracking-widest leading-relaxed text-white/60 max-w-2xl font-[family-name:var(--font-body)]">
            {RGRM_IDENTITY.mission} Every garment is an acquisition of structural integrity.
          </p>

          <div className="pt-12">
            <Link href="/selection">
              <button className="btn-acquire">
                Enter the Gallery
              </button>
            </Link>
          </div>
        </div>

        {/* ARCHITECTURAL WATERMARK */}
        <div className="absolute bottom-[-10%] right-[-5%] text-[30vw] font-black text-white/[0.02] uppercase pointer-events-none select-none leading-none">
          {RGRM_IDENTITY.shortName}
        </div>
      </section>

      {/* SYSTEM COORDINATES FOOTER */}
      <footer className="p-12 blueprint-border border-b-0 border-x-0 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        <div>
          <p className="text-[10px] uppercase font-bold text-white/20 tracking-widest mb-2">Blueprint Founder</p>
          <p className="text-xs uppercase font-bold tracking-widest">{RGRM_IDENTITY.founder}</p>
        </div>

        <div className="flex gap-6 justify-center">
          <a href={RGRM_CHANNELS.instagram} target="_blank" className="text-[10px] uppercase tracking-widest hover:text-rgrm-red transition-colors">IG</a>
          <a href={RGRM_CHANNELS.x} target="_blank" className="text-[10px] uppercase tracking-widest hover:text-rgrm-red transition-colors">X</a>
          <a href={RGRM_CHANNELS.linkedin} target="_blank" className="text-[10px] uppercase tracking-widest hover:text-rgrm-red transition-colors">LI</a>
        </div>

        <div className="text-right">
          <p className="text-[8px] uppercase tracking-[0.5em] text-white/20 leading-loose">
            © {RGRM_IDENTITY.established} {RGRM_IDENTITY.shortName} Studio <br />
            {RGRM_IDENTITY.tagline}
          </p>
        </div>
      </footer>
    </main>
  );
}
