'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

/**
 * RGRM // REGISTRY SUCCESS PROTOCOL
 * Post-acquisition identity confirmation interface.
 */

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  // Logic to clear the cart after a successful acquisition
  useEffect(() => {
    localStorage.removeItem('rgrm-registry-manifest');
  }, []);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 pt-24">
      <div className="max-w-2xl w-full border border-white/10 p-8 md:p-12 relative overflow-hidden">
        
        {/* BACKGROUND ACCENT */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rgrm-red/5 blur-3xl rounded-full -mr-16 -mt-16" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* HEADER SECTION */}
          <header className="mb-12 border-b border-white/10 pb-8">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
              IDENTITY_REGISTERED
            </h1>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-rgrm-red font-bold">
              Protocol 002 // Acquisition Confirmed
            </p>
          </header>

          {/* STATUS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 font-mono text-[10px] uppercase tracking-widest">
            <div className="space-y-4">
              <p className="text-white/40 italic">// REGISTRY DATA</p>
              <div className="space-y-1">
                <p className="text-white">ID: {sessionId?.slice(0, 18) || 'PENDING_REF'}...</p>
                <p className="text-white">STATUS: MANUFACTURING_INITIATED</p>
                <p className="text-white">SECTOR: STORE_17181557</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-white/40 italic">// NEXT STEPS</p>
              <div className="space-y-1 text-white/80">
                <p>1. Receipt transmitted via email.</p>
                <p>2. Quality analysis in progress.</p>
                <p>3. Tracking injected upon shipment.</p>
              </div>
            </div>
          </div>

          {/* MANIFESTO SNIPPET */}
          <div className="bg-white/5 p-6 border-l-2 border-rgrm-red mb-12">
            <p className="text-xs leading-relaxed text-white/70 uppercase">
              "YOU HAVE ACQUIRED MORE THAN A GARMENT. YOU HAVE REGISTERED YOUR COORDINATES WITHIN THE RGRM ECOSYSTEM. FUNCTION IS NOW YOUR ONLY AESTHETIC."
            </p>
          </div>

          {/* ACTION MODULAR */}
          <div className="flex flex-col md:flex-row gap-4">
            <Link 
              href="/selection"
              className="flex-1 bg-white text-black text-center py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-rgrm-red hover:text-white transition-all duration-300"
            >
              Return to Selection
            </Link>
            <Link 
              href="/"
              className="flex-1 border border-white/20 text-white text-center py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all duration-300"
            >
              View Manifesto
            </Link>
          </div>
        </motion.div>

        {/* FOOTER WATERMARK */}
        <div className="mt-12 text-[8px] text-white/20 uppercase tracking-[0.6em] text-center">
          © 2026 RGRMstudio // All Rights Reserved
        </div>
      </div>
    </main>
  );
}
