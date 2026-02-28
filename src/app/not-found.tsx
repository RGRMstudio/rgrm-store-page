'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * RGRM // NULL REFERENCE PROTOCOL
 * Custom 404 interface for unauthorized route access.
 */

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full border border-white/10 p-8 md:p-12 text-center relative">
        
        {/* GLITCH EFFECT DECOR */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-rgrm-red/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <header className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">
              404
            </h1>
            <p className="text-[10px] uppercase tracking-[0.5em] text-rgrm-red font-bold mt-4">
              Error: Null_Reference_Detected
            </p>
          </header>

          <div className="space-y-6 mb-12">
            <p className="text-xs text-white/50 leading-relaxed uppercase font-mono">
              The requested coordinate does not exist within the current 
              Identity Registry architecture. 
              Please recalibrate your destination.
            </p>
            
            <div className="text-[10px] text-white/20 font-mono uppercase italic">
              Sector: [unauthorized_access] <br />
              Status: [terminated]
            </div>
          </div>

          <Link 
            href="/"
            className="inline-block w-full bg-white text-black py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-rgrm-red hover:text-white transition-all duration-300"
          >
            Return to Nexus
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
