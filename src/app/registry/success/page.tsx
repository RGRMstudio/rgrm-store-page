'use client';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-rgrm-light flex items-center justify-center px-6 pt-24">
      <div className="max-w-lg w-full border border-white/5 p-10 md:p-14 text-center">

        {/* Confirm icon */}
        <div className="w-14 h-14 border border-rgrm-red rounded-full flex items-center justify-center mx-auto mb-10">
          <span className="text-rgrm-red font-mono text-xl">✓</span>
        </div>

        {/* Headline */}
        <p className="font-mono text-[10px] text-rgrm-red tracking-[0.3em] uppercase mb-4">
          ACQUISITION CONFIRMED
        </p>
        <h1 className="font-sans font-black text-4xl md:text-5xl uppercase tracking-[-0.04em] leading-none mb-6">
          Identity_<br/>Registered
        </h1>

        {/* Spec lines */}
        <div className="border-t border-white/5 text-left space-y-0 mb-10">
          <div className="flex justify-between py-3 border-b border-white/5">
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Status</span>
            <span className="font-mono text-[10px] text-rgrm-red flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rgrm-red animate-pulse" />
              Shipment Initialized
            </span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/5">
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Fulfillment</span>
            <span className="font-mono text-[10px] text-white/40">Printful // Made to Order</span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/5">
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Receipt</span>
            <span className="font-mono text-[10px] text-white/40">Dispatched to your email</span>
          </div>
        </div>

        <p className="font-mono text-xs text-white/40 leading-relaxed mb-10">
          Your acquisition has been logged into the RGRM core manifest.
          The manufacturing sequence has been triggered.
        </p>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/"
            className="border border-white/20 font-mono text-[10px] uppercase tracking-widest text-white py-4 hover:border-white transition-colors text-center"
          >
            Return_To_Base
          </Link>
          <Link
            href="/selection"
            className="bg-rgrm-red font-mono text-[10px] uppercase tracking-widest text-white py-4 hover:bg-white hover:text-black transition-colors text-center"
          >
            Continue_Acquiring
          </Link>
        </div>

        <p className="font-mono text-[9px] text-white/10 uppercase tracking-widest mt-10">
          RGRM // STUDIO_MODULE_002 // SESSION_AUTHENTICATED
        </p>

      </div>
    </main>
  );
}
