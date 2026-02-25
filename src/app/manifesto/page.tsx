import React from 'react';
import Link from 'next/link';
import { RGRM_IDENTITY, RGRM_PHASES } from '@/lib/constants';

// --- SEO CONFIGURATION ---
export const metadata = {
  title: 'MANIFESTO // PROTOCOL',
  description: 'The underlying philosophy of structural integrity. We do not design clothes; we engineer silhouettes.',
};

export default function ManifestoPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 relative flex justify-center bg-black overflow-hidden">
      
      {/* --- BACKGROUND WATERMARK (Fixed & Subtle) --- */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.02] pointer-events-none select-none z-0 font-[family-name:var(--font-headline)] leading-none">
        001
      </div>

      <div className="max-w-3xl w-full relative z-10 space-y-24">
        
        {/* --- SECTION 1: THE PREAMBLE --- */}
        <header className="border-l-4 border-rgrm-red pl-8 md:pl-12 py-2">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rgrm-red mb-6 animate-pulse">
            Directives // {RGRM_IDENTITY.founder}
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] font-[family-name:var(--font-headline)] text-white">
            We do not design clothes. <br />
            <span className="text-white/50">We engineer silhouettes.</span>
          </h1>
        </header>

        {/* --- SECTION 2: THE CORE TENETS --- */}
        <section className="space-y-16">
          
          {/* Tenet 01 */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start group">
            <span className="text-rgrm-red font-mono text-xl font-bold pt-1 opacity-50 group-hover:opacity-100 transition-opacity">
              01.
            </span>
            <div className="space-y-4">
              <h3 className="text-xl uppercase font-bold tracking-widest text-white border-b border-white/10 pb-2 inline-block">
                Function is Absolute
              </h3>
              <p className="text-white/70 leading-loose font-[family-name:var(--font-body)] text-sm md:text-base max-w-lg">
                A garment without purpose is merely decoration. Every stitch, seam, and pocket must serve a structural or utility-based function. We reject ornamentation. We embrace the raw data of the material.
              </p>
            </div>
          </div>

          {/* Tenet 02 */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start group">
            <span className="text-rgrm-red font-mono text-xl font-bold pt-1 opacity-50 group-hover:opacity-100 transition-opacity">
              02.
            </span>
            <div className="space-y-4">
              <h3 className="text-xl uppercase font-bold tracking-widest text-white border-b border-white/10 pb-2 inline-block">
                Structural Integrity
              </h3>
              <p className="text-white/70 leading-loose font-[family-name:var(--font-body)] text-sm md:text-base max-w-lg">
                Fabric is not soft; it is a flexible building material. Our patterns are derived from architectural blueprints, not traditional tailoring. We build for the urban environment—concrete, steel, and glass.
              </p>
            </div>
          </div>

          {/* Tenet 03 */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start group">
            <span className="text-rgrm-red font-mono text-xl font-bold pt-1 opacity-50 group-hover:opacity-100 transition-opacity">
              03.
            </span>
            <div className="space-y-4">
              <h3 className="text-xl uppercase font-bold tracking-widest text-white border-b border-white/10 pb-2 inline-block">
                The Uniform
              </h3>
              <p className="text-white/70 leading-loose font-[family-name:var(--font-body)] text-sm md:text-base max-w-lg">
                Identity is distraction. The RGRM uniform is designed to anonymize the wearer while amplifying their capability. It is armor for the modern operator.
              </p>
            </div>
          </div>

        </section>

        {/* --- SECTION 3: THE TIMELINE --- */}
        <section className="pt-12 border-t border-white/10">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter font-[family-name:var(--font-headline)]">
              Operational Phases
            </h2>
            <span className="text-[10px] uppercase tracking-widest text-rgrm-red animate-pulse border border-rgrm-red px-2 py-1">
              System Active
            </span>
          </div>

          {/* Timeline Graphic */}
          <div className="relative border-l border-white/20 ml-2 space-y-12 pb-12">
            
            {/* Phase 1 (Active) */}
            <div className="relative pl-8 group">
              {/* Dot Indicator */}
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-rgrm-red rounded-full shadow-[0_0_15px_#BC2026]" />
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-rgrm-red block tracking-widest">
                  CURRENT STATUS: {RGRM_PHASES.current.status}
                </span>
                <h4 className="text-lg font-bold uppercase tracking-widest text-white">
                  Phase {RGRM_PHASES.current.id}: {RGRM_PHASES.current.name}
                </h4>
                <p className="text-sm text-white/50 max-w-md font-[family-name:var(--font-body)]">
                  {RGRM_PHASES.current.description}
                </p>
              </div>
            </div>

            {/* Phase 2 (Future) */}
            <div className="relative pl-8 opacity-50 hover:opacity-100 transition-opacity duration-500">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-black border border-white rounded-full" />
              <div className="space-y-2">
                <span className="text-[10px] font-mono block tracking-widest text-white/50">
                  STATUS: PENDING
                </span>
                <h4 className="text-lg font-bold uppercase tracking-widest text-white">
                  Phase 002: Expansion
                </h4>
                <p className="text-sm text-white/50 max-w-md font-[family-name:var(--font-body)]">
                  Integration of technical outerwear and modular luggage systems.
                </p>
              </div>
            </div>

            {/* Phase 3 (Future - Redacted) */}
            <div className="relative pl-8 opacity-30 hover:opacity-60 transition-opacity duration-500">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-black border border-white rounded-full" />
              <div className="space-y-2">
                <span className="text-[10px] font-mono block tracking-widest text-white/50">
                  STATUS: LOCKED
                </span>
                <h4 className="text-lg font-bold uppercase tracking-widest text-white flex items-center gap-2">
                  Phase 003: <span className="bg-white/20 text-transparent select-none px-1">REDACTED</span>
                </h4>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">
                  Access Denied. Clearance Level 5 Required.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* --- FOOTER SIGNOFF --- */}
        <div className="text-center pt-16 pb-12">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8">
            End of Protocol
          </p>
          
          <div className="h-24 w-[1px] bg-gradient-to-b from-white/30 to-transparent mx-auto" />
          
          <div className="mt-8">
             <Link href="/">
               <button className="text-xs font-bold uppercase tracking-widest border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-all duration-300">
                 Return to Base
               </button>
             </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
