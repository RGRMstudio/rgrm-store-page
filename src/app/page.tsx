import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="space-y-6 max-w-2xl relative z-10">
        {/* Identity Headline */}
        <h2 className="text-[var(--fg)] font-sans text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
          NOT STYLE.<br/>IDENTITY.
        </h2>
        
        {/* Collection Status Signal */}
        <p className="text-[#BC2026] font-mono text-xs uppercase tracking-[0.5em] mb-12 animate-pulse">
          [ Q4_2026_COLLECTION_LIVE ]
        </p>

        {/* Primary Action - Points to the now-unlocked /selection route */}
        <Link 
          href="/selection" 
          className="btn-industrial inline-block border border-[var(--fg)] px-12 py-4 hover:bg-[#BC2026] hover:border-[#BC2026] transition-all duration-500 font-bold tracking-widest"
        >
          INITIATE_COLLECTION
        </Link>
      </div>

      {/* Industrial Metadata Footer */}
      <div className="absolute bottom-12 left-12 hidden md:block text-left">
        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest leading-relaxed">
          RaGuiRoMo Industrial Art Machine<br/>
          System_v01.0 // Dead Link Theory<br/>
          Proprietary Research Pipeline
        </p>
      </div>

      {/* Decorative Background Grid Element (Subtle) */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none border-x border-[var(--industrial-border)] mx-auto max-w-6xl w-full" />
    </main>
  );
}
