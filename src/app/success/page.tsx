import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessPage() {
  const acquisitionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-8">
      {/* Structural Container */}
      <div className="w-full max-w-2xl border border-white/10 bg-zinc-950 p-8 md:p-16 relative overflow-hidden">
        
        {/* Accent Geometry (10% Bauhaus Red) */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#BC2026]" />
        
        {/* Header Section */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-[#BC2026] w-6 h-6" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500">
              Protocol: Acquisition_Success
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase font-[var(--font-headline)]">
            Certificate of <br />
            <span className="text-[#BC2026]">Acquisition</span>
          </h1>
        </div>

        {/* Technical Specifications */}
        <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5 font-[var(--font-body)] text-xs uppercase tracking-widest">
          <div className="space-y-2">
            <p className="text-zinc-500">Subject</p>
            <p className="text-white">Study 001: Brutalist Lineage</p>
          </div>
          <div className="space-y-2">
            <p className="text-zinc-500">Acquisition Date</p>
            <p className="text-white">{acquisitionDate}</p>
          </div>
          <div className="space-y-2">
            <p className="text-zinc-500">Integrity Status</p>
            <p className="text-[#BC2026]">Validated</p>
          </div>
          <div className="space-y-2">
            <p className="text-zinc-500">Studio Origin</p>
            <p className="text-white">RaGuiRoMo Studio</p>
          </div>
        </div>

        {/* Narrative Closing */}
        <div className="mt-12 space-y-6">
          <p className="text-zinc-400 font-[var(--font-body)] leading-relaxed text-sm md:text-base">
            This piece is a study in structural geometry and raw composition. 
            You are now the steward of its maintenance. Follow the 
            <span className="text-white italic"> Preservation Protocol</span> to ensure 
            the longevity of its form and structural beauty.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link 
              href="/"
              className="px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[#BC2026] hover:text-white transition-all text-center"
            >
              Return to Gallery
            </Link>
            <Link 
              href="/registry"
              className="px-8 py-4 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:border-white transition-all text-center"
            >
              Access Registry
            </Link>
          </div>
        </div>

        {/* Fine Print / Branding Signature */}
        <p className="mt-16 text-[9px] text-zinc-600 uppercase tracking-[0.5em] text-center">
          RaGuiRoMo.Store // Form Follows Function
        </p>
      </div>
    </main>
  );
}
