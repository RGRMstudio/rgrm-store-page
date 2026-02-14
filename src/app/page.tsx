'use client';

import React, { useState } from 'react';
import ProductGrid from '@/components/ProductCard';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#BC2026] selection:text-white font-[family-name:var(--font-body)]">
      
      {/* SECTION 01: THE STUDIO HEADER */}
      <header className="p-6 md:p-12 flex justify-between items-start border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-none font-[family-name:var(--font-headline)]">
            RaGuiRoMo Studio
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
            Phase 01: Brutalist Lineage // RGRM
          </p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] uppercase font-bold text-[#BC2026] animate-pulse">System Status: Operational</p>
          <p className="text-[10px] uppercase text-white/30">Founder: Raul Guillermo Rosario Morales</p>
        </div>
      </header>

      {/* SECTION 02: HERO / THE MANIFESTO */}
      <section className="px-6 py-20 md:px-12 md:py-32 max-w-6xl">
        <h2 className="text-6xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-10 font-[family-name:var(--font-headline)]">
          Form <br />
          <span className="text-white/20 italic font-light tracking-normal">Follows</span> <br />
          Function
        </h2>
        <div className="h-[1px] w-24 bg-[#BC2026] mb-8"></div>
        <p className="text-lg md:text-2xl font-medium max-w-2xl text-white/90 leading-tight">
          Bridging the gap between architectural precision and modern streetwear. 
          Every garment is a study in structural integrity.
        </p>
      </section>

      {/* SECTION 03: THE ACQUISITION GALLERY */}
      <section id="studies" className="border-y border-white/10">
        <div className="p-6 md:p-12 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h3 className="text-xs uppercase font-bold tracking-widest font-[family-name:var(--font-headline)]">Available Studies</h3>
          <span className="text-[10px] text-white/30 uppercase tracking-widest">Blueprint Acquisition Enabled</span>
        </div>
        <ProductGrid />
      </section>

      {/* SECTION 04: THE REGISTRY & STUDIO MUSE */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Registry Wing */}
        <div className="p-12 border-r border-white/10 flex flex-col justify-center space-y-8 bg-black">
          <div className="space-y-2">
            <h4 className="text-3xl font-black uppercase leading-none font-[family-name:var(--font-headline)]">Integrity Registry</h4>
            <p className="text-xs text-white/50 uppercase tracking-widest">Secure your place in the RGRM lineage.</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-0">
               <input 
                 type="email" 
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder={status === 'success' ? "ACQUIRED BY REGISTRY" : "INPUT@ARCHITECT.COM"} 
                 className="bg-transparent border border-white/20 p-4 text-[10px] flex-grow focus:outline-none focus:border-[#BC2026] transition-colors placeholder:text-white/20"
               />
               <button 
                 type="submit"
                 disabled={status === 'loading'}
                 className="bg-white text-black px-8 py-4 text-[10px] font-bold uppercase hover:bg-[#BC2026] hover:text-white transition-all disabled:opacity-50"
               >
                 {status === 'loading' ? "Processing..." : "Register"}
               </button>
            </div>
            {status === 'error' && <p className="text-[10px] text-[#BC2026] uppercase">Structural Error. Please try again.</p>}
            {status === 'success' && <p className="text-[10px] text-green-500 uppercase font-bold">Registration Confirmed. Welcome to the Studio.</p>}
          </form>
        </div>

        {/* Muse Wing */}
        <div className="p-12 bg-[#0055A4]/5 flex flex-col justify-between relative overflow-hidden group">
           <div className="relative z-10">
             <p className="text-[10px] uppercase font-bold text-[#0055A4] mb-2 tracking-[0.3em]">// Future Roadmap</p>
             <h4 className="text-2xl font-black uppercase leading-tight font-[family-name:var(--font-headline)]">
               Phase 02: <br />Primary Spectrum
             </h4>
           </div>
           <h4 className="absolute -bottom-10 -right-10 text-[15rem] font-black uppercase tracking-tighter leading-none text-white/[0.03] select-none group-hover:text-[#0055A4]/10 transition-colors duration-700">
             RGRM
           </h4>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[9px] tracking-[0.4em] text-white/20 uppercase">
          © 2026 RaGuiRoMo Studio // Form Follows Function // r. morales
        </p>
        <div className="flex gap-8 text-[9px] uppercase font-bold tracking-widest text-white/40">
          <a href="#" className="hover:text-[#BC2026] transition-colors">Archive</a>
          <a href="#" className="hover:text-[#BC2026] transition-colors">Integrity</a>
          <a href="#" className="hover:text-[#BC2026] transition-colors">Studio Support</a>
        </div>
      </footer>
    </main>
  );
}
