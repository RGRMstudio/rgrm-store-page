'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BlueprintGrid from '@/components/ui/BlueprintGrid';

/**
 * RGRM // TRANSACTION_FINALIZATION_INTERFACE
 * Status: Authenticating Session...
 */

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
      <BlueprintGrid />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full border border-white/10 p-8 md:p-12 bg-black/80 backdrop-blur-2xl relative z-10 text-center"
      >
        {/* Verification Pulse */}
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 border border-rgrm-red/30 rounded-full animate-ping absolute" />
            <div className="w-20 h-20 border-2 border-rgrm-red rounded-full flex items-center justify-center relative bg-black">
               <span className="text-rgrm-red text-2xl">✓</span>
            </div>
          </div>
        </div>

        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2">
            Acquisition_Locked
          </h1>
          <p className="text-[10px] font-mono text-rgrm-red uppercase tracking-[0.3em]">
            Identity_Registry_Confirmed
          </p>
        </header>

        <div className="space-y-4 mb-10 text-[11px] font-mono text-white/50 uppercase leading-relaxed border-y border-white/5 py-8">
          <div className="flex justify-between">
             <span>Session_ID:</span>
             <span className="text-white truncate ml-4">{sessionId || 'AUTH_BYPASS'}</span>
          </div>
          <div className="flex justify-between">
             <span>Status:</span>
             <span className="text-white text-green-500">Authenticated</span>
          </div>
          <div className="flex justify-between">
             <span>Fulfillment:</span>
             <span className="text-white">Manufacturing_Queue</span>
          </div>
        </div>

        <p className="text-xs text-white/40 mb-12 leading-relaxed">
          The structural study has been allocated to your profile. A technical dossier 
          containing manufacturing updates will be dispatched to your email.
        </p>

        <div className="flex flex-col gap-3">
          <Link 
            href="/selection"
            className="w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-widest hover:bg-rgrm-red hover:text-white transition-colors"
          >
            Continue_Archive_Research
          </Link>
          <Link 
            href="/"
            className="w-full border border-white/10 py-4 text-[10px] font-black uppercase tracking-widest hover:border-white transition-colors"
          >
            Return_To_Nexus
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <SuccessContent />
    </Suspense>
  );
}
