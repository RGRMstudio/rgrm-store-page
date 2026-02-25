import React from 'react';
import Link from 'next/link';
import { RGRM_IDENTITY, RGRM_PHASES, RGRM_CHANNELS } from '@/lib/constants';
import TextReveal from '@/components/ui/TextReveal';

// ARCHITECTURE: This is a React Server Component.
// It fetches no dynamic data, so it is statically generated (SSG) for instant loading.

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col selection:bg-[#BC2026] selection:text-white relative z-10">
      
      {/* --- STRUCTURAL HEADER --- */}
      <nav className="p-6 flex justify-between items-center border-b border-white/10 md:border-none">
        <span className="font-black tracking-tighter text-xl md:text-2xl font-[family-name:var(--font-headline)]">
          {RGRM_IDENTITY.shortName}
        </span>
        
        {/* Navigation Links */}
        <div className="flex gap-4 md:gap-8 text-[10px] uppercase tracking-[0.3em] font-bold">
          <Link 
            href="/manifesto" 
            className="hover:text-rgrm-red transition-colors duration-300"
          >
            Protocol
          </Link>
          <Link 
            href="/selection" 
            className="hover:text-rgrm-red transition-colors duration-300"
          >
            Studies
          </Link>
          <Link 
            href="/registry" 
            className="hover:text-rgrm-red transition-colors duration-300"
          >
            Registry
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION: THE MANIFESTO --- */}
      <section className="flex-grow flex flex-col justify-center px-6 md:px-24 py-12 md:py-24 relative overflow-hidden">
        
        <div className="max-w-5xl space-y-8 z-10 relative">
          
          {/* Status Indicator */}
          <div className="flex items-center gap-3 text-rgrm-red text-xs font-bold uppercase tracking-[0.4em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rgrm-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rgrm-red"></span>
            </span>
            <p>Status: {RGRM_PHASES.current.status} // Phase {RGRM_PHASES.current.id}</p>
          </div>
          
          {/* Headline with Motion Reveal */}
          <div className="min-h-[120px] md:min-h-[240px]">
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] font-[family-name:var(--font-headline)]">
              <TextReveal text={RGRM_PHASES.current.name} />
            </h1>
          </div>

          {/* Subtext */}
          <div className="max-w-2xl border-l-2 border-white/20 pl-6 md:pl-8 py-2">
            <p className="text-sm md:text-lg uppercase tracking-widest leading-relaxed text-white/70 font-[family-name:var(--font-body)]">
              {RGRM_IDENTITY.mission} <br />
              <span className="text-white font-bold mt-2 block">
                Every garment is an acquisition of structural integrity.
              </span>
            </p>
          </div>

          {/* Call to Action Button */}
          <div className="pt-8 md:pt-12">
            <Link href="/selection">
              <button className="group relative px-8 py-4 bg-transparent border border-white text-white overflow-hidden transition-all duration-300 hover:text-black">
                <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                <span className="relative z-10 text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-4">
                  Enter the Gallery
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* --- ARCHITECTURAL WATERMARK --- */}
        <div className="absolute bottom-[-5%] right-[-5%] text-[30vw] font-black text-white/[0.02] uppercase pointer-events-none select-none leading-none font-[family-name:var(--font-headline)] z-0">
          {RGRM_IDENTITY.shortName}
        </div>
      </section>

      {/* --- SYSTEM COORDINATES FOOTER --- */}
      <footer className="p-8 md:p-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 items-end bg-black/40 backdrop-blur-sm">
        
        {/* Col 1: Founder */}
        <div>
          <p className="text-[9px] uppercase font-bold text-white/40 tracking-[0.2em] mb-2">Blueprint Founder</p>
          <p className="text-xs uppercase font-bold tracking-widest text-rgrm-red">{RGRM_IDENTITY.founder}</p>
        </div>

        {/* Col 2: Socials */}
        <div className="flex gap-8 justify-start md:justify-center">
          {[
            { name: 'Instagram', url: RGRM_CHANNELS.instagram },
            { name: 'Twitter / X', url: RGRM_CHANNELS.x },
            { name: 'LinkedIn', url: RGRM_CHANNELS.linkedin }
          ].map((social) => (
            <a 
              key={social.name}
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-widest hover:text-rgrm-red hover:underline decoration-rgrm-red underline-offset-4 transition-all duration-300"
            >
              {social.name}
            </a>
          ))}
        </div>

        {/* Col 3: Copyright */}
        <div className="text-left md:text-right">
          <p className="text-[8px] uppercase tracking-[0.3em] text-white/30 leading-loose font-mono">
            © {RGRM_IDENTITY.established} {RGRM_IDENTITY.shortName} Studio <br />
            {RGRM_IDENTITY.tagline}
          </p>
        </div>
      </footer>
    </main>
  );
}
