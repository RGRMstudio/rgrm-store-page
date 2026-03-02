'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BlueprintGrid from '@/components/ui/BlueprintGrid';

/**
 * RGRM // SUCCESS_REGISTRY_INTERFACE
 * Status: Authenticated. Post-Acquisition Flow.
 */

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
      <BlueprintGrid />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full border border-white/10 p-8 md:p-12 bg-black/50 backdrop-blur-xl relative z-10 text-center"
      >
        {/* Success Icon - FIXED SYNTAX (Line 171 focus) */}
        <div className="w-16 h-16 border-2 border-rgrm-red rounded-full mx-auto flex items-center justify-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-8 h-px bg-rgrm-red rotate-45 translate-y-1 translate-x-1"
          />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-4 h-px bg-rgrm-red -rotate-45 -translate-x-2 -translate-y-1"
          />
        </div>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Identity_Registered
          </h1>
          <p className="text-[10px] font-mono text-rgrm-red uppercase tracking-widest">
            Status: Acquisition_Confirmed // Structural_Study_Locked
          </p>
        </header>

        <div className="space-y-6 mb-12 text-xs text-white/60 uppercase font-mono leading-relaxed">
          <p>
            Your acquisition has been logged into the RGRM Studio core manifest. 
            The manufacturing sequence for your specific study has been initialized.
          </p>
          <p>
            A digital dossier and receipt of transaction have been dispatched 
            to your registered email address.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/selection"
            className="border border-white/20 hover:border-rgrm-red py-4 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Return_To_Archive
          </Link>
          <Link 
            href="/"
            className="bg-white text-black hover:bg-rgrm-red hover:text-white py-4 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Return_To_Nexus
          </Link>
        </div>

        <footer className="mt-12 pt-8 border-t border-white/5">
          <p className="text-[9px] text-white/20 font-mono italic">
            Reference_ID: [SESSION_AUTHENTICATED] <br />
            RGRM // STUDIO_MODULE_002
          </p>
        </footer>
      </motion.div>
    </main>
  );
}
