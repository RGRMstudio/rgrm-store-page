'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { subscribeToRegistry } from '@/app/actions/news';

export default function RegisterPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function clientAction(formData: FormData) {
    setStatus('idle');
    const result = await subscribeToRegistry(formData);
    if (result?.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#BC2026]">
      <nav className="p-6 border-b border-white/10 flex justify-between">
        <Link href="/selection" className="text-[10px] uppercase font-bold tracking-widest hover:text-[#BC2026] transition-colors">
          ← Back to Selection
        </Link>
      </nav>

      <section className="flex-grow flex flex-col items-center justify-center p-6 md:p-24 min-h-[80vh]">
        <div className="w-full max-w-2xl space-y-12">
          <div className="space-y-4">
            <p className="text-[#BC2026] text-[10px] font-bold uppercase tracking-[0.5em]">Phase 01: Registry</p>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none font-[family-name:var(--font-headline)]">
              Join the <br />Lineage
            </h1>
          </div>

          <form action={clientAction} className="space-y-8">
            <div className="border-b border-white/20 focus-within:border-[#BC2026] transition-colors">
              <input 
                name="email"
                type="email" 
                required
                placeholder={status === 'success' ? "REGISTRATION LOGGED" : "INPUT@ARCHITECT.COM"} 
                className="w-full bg-transparent py-6 text-2xl md:text-4xl font-black uppercase focus:outline-none placeholder:text-white/5"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-black py-6 font-black uppercase tracking-[0.4em] hover:bg-[#BC2026] hover:text-white transition-all"
            >
              {status === 'success' ? "Confirmed" : "Submit Blueprint"}
            </button>
            
            {status === 'error' && (
              <p className="text-[10px] text-[#BC2026] uppercase font-bold tracking-widest">
                Structural Error: Verification Failed.
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="p-12 border-t border-white/10 text-center">
        <p className="text-[9px] uppercase tracking-[0.5em] text-white/20">
          RGRM Studio // Finalizing Phase 01
        </p>
      </footer>
    </main>
  );
}
