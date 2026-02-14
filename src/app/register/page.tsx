'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <main className="min-h-screen bg-black text-white flex flex-col selection:bg-[#BC2026]">
      <nav className="p-6 border-b border-white/10 flex justify-between">
        <Link href="/selection" className="text-[10px] uppercase font-bold tracking-widest hover:text-[#BC2026] transition-colors">
          ← Back to Selection
        </Link>
      </nav>

      <section className="flex-grow flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-xl space-y-12">
          <div className="space-y-4">
            <p className="text-[#BC2026] text-[10px] font-bold uppercase tracking-[0.5em]">Phase 01: Registry</p>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none font-[family-name:var(--font-headline)]">
              Join the <br />Lineage
            </h1>
            <p className="text-sm text-white/50 uppercase tracking-widest leading-relaxed">
              Register your email to be notified of future phases and structural updates from RGRM Studio.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="group border-b border-white/20 focus-within:border-[#BC2026] transition-colors">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={status === 'success' ? "REGISTRATION COMPLETE" : "info@raguiromo.store"} 
                className="w-full bg-transparent py-4 text-xl md:text-2xl font-bold uppercase focus:outline-none placeholder:text-white/10"
              />
            </div>

            <button 
              disabled={status === 'loading'}
              className="w-full bg-white text-black py-6 font-black uppercase tracking-widest hover:bg-[#BC2026] hover:text-white transition-all disabled:opacity-50"
            >
              {status === 'loading' ? "Processing..." : "Submit to Registry"}
            </button>
            
            {status === 'success' && <p className="text-center text-[10px] text-green-500 uppercase font-bold">Structural integrity verified. You are in the registry.</p>}
            {status === 'error' && <p className="text-center text-[10px] text-[#BC2026] uppercase font-bold">System Error. Check connection.</p>}
          </form>
        </div>
      </section>

      <footer className="p-12 border-t border-white/10 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-white/20">
          RGRM Studio // Form Follows Function
        </p>
      </footer>
    </main>
  );
}

