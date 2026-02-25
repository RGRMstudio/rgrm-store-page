'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RGRM_IDENTITY } from '@/lib/constants';

// --- CONFIGURATION ---
const SUCCESS_DELAY = 2000; // 2 seconds to simulate "encryption"

export default function RegistryPage() {
  const [formState, setFormState] = useState<'IDLE' | 'PROCESSING' | 'GRANTED' | 'DENIED'>('IDLE');
  const [email, setEmail] = useState('');
  const [codename, setCodename] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate network request / "System Processing"
    setFormState('PROCESSING');
    
    // In a real app, you would send a POST request to your API here.
    setTimeout(() => {
      // 90% chance of success for the simulation
      const success = Math.random() > 0.1; 
      setFormState(success ? 'GRANTED' : 'DENIED');
    }, SUCCESS_DELAY);
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-black">
      
      {/* --- BACKGROUND DECORATION --- */}
      {/* Top red laser line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rgrm-red to-transparent opacity-50" />
      
      {/* Pulsing circles in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[600px] h-[600px] border border-white/5 rounded-full animate-pulse opacity-20" />
        <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full opacity-10" />
      </div>

      <div className="max-w-md w-full relative z-10 border border-white/10 bg-black/90 backdrop-blur-md p-8 md:p-12 shadow-2xl">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block px-3 py-1 border border-rgrm-red text-rgrm-red text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
            Secure Channel
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter font-[family-name:var(--font-headline)]">
            Registry Access
          </h1>
          <p className="text-xs text-white/50 uppercase tracking-widest leading-relaxed font-mono">
            Phase 002 is currently restricted. <br />
            Input credentials to request future clearance.
          </p>
        </div>

        {/* --- THE INTERFACE --- */}
        {formState === 'GRANTED' ? (
          <SuccessMessage />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Field: Codename */}
            <div className="group relative">
              <label htmlFor="codename" className="absolute -top-3 left-2 bg-black px-2 text-[9px] uppercase tracking-widest text-rgrm-red font-bold z-10">
                Codename // Optional
              </label>
              <input
                type="text"
                id="codename"
                value={codename}
                onChange={(e) => setCodename(e.target.value)}
                placeholder="ENTER ALIAS..."
                autoComplete="off"
                className="w-full bg-transparent border border-white/20 p-4 text-sm font-mono text-white placeholder:text-white/20 focus:border-rgrm-red focus:outline-none focus:bg-white/5 transition-all uppercase rounded-none"
                disabled={formState === 'PROCESSING'}
              />
            </div>

            {/* Field: Email */}
            <div className="group relative">
              <label htmlFor="email" className="absolute -top-3 left-2 bg-black px-2 text-[9px] uppercase tracking-widest text-rgrm-red font-bold z-10">
                Contact Protocol // Required
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="USER@DOMAIN.COM"
                autoComplete="email"
                className="w-full bg-transparent border border-white/20 p-4 text-sm font-mono text-white placeholder:text-white/20 focus:border-rgrm-red focus:outline-none focus:bg-white/5 transition-all uppercase rounded-none"
                disabled={formState === 'PROCESSING'}
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox" 
                id="terms" 
                required 
                className="mt-1 appearance-none w-4 h-4 border border-white/40 checked:bg-rgrm-red checked:border-rgrm-red transition-colors cursor-pointer shrink-0 rounded-none relative"
              />
              <label htmlFor="terms" className="text-[9px] uppercase tracking-wide text-white/40 leading-normal cursor-pointer select-none">
                I acknowledge that data submission grants {RGRM_IDENTITY.shortName} permission to transmit encrypted updates regarding future phases.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formState === 'PROCESSING'}
              className={`w-full py-4 text-xs font-bold uppercase tracking-[0.3em] border border-white transition-all duration-300 relative overflow-hidden group ${
                formState === 'PROCESSING' ? 'bg-white/10 text-white/50 cursor-wait' : 'hover:bg-white hover:text-black'
              }`}
            >
              {formState === 'PROCESSING' ? (
                <span className="animate-pulse flex items-center justify-center gap-2">
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-100"></span>
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-200"></span>
                  Encrypted Handshake...
                </span>
              ) : (
                <span className="relative z-10">Initialize Request</span>
              )}
            </button>

            {/* Error Message */}
            {formState === 'DENIED' && (
              <div className="text-center space-y-2 border border-red-900/50 bg-red-900/10 p-4 mt-4">
                <p className="text-xs text-red-500 font-bold uppercase tracking-widest">
                  ACCESS DENIED
                </p>
                <p className="text-[9px] text-red-400/70 font-mono">
                  ERROR: NETWORK_CONGESTION. RETRY UPLOAD.
                </p>
              </div>
            )}

          </form>
        )}

        {/* --- FOOTER META --- */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
           <p className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-mono">
             System ID: 884-XJ-9 // V.1.0.4
           </p>
           <div className="mt-6">
             <Link href="/" className="text-[9px] uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
               ← Terminate Session
             </Link>
           </div>
        </div>

      </div>
    </main>
  );
}

// --- SUB-COMPONENT: SUCCESS STATE ---
function SuccessMessage() {
  return (
    <div className="text-center space-y-6 py-8 animate-in fade-in zoom-in duration-500">
      
      {/* Success Icon */}
      <div className="w-16 h-16 border-2 border-rgrm-red rounded-full mx-auto flex items-
