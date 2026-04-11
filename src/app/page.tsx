export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="space-y-6 max-w-2xl">
        <h2 className="text-[var(--fg)] font-sans text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
          NOT STYLE.<br/>IDENTITY.
        </h2>
        
        <p className="text-[#BC2026] font-mono text-xs uppercase tracking-[0.5em] mb-12">
          [ Q4_2026_COLLECTION_LIVE ]
        </p>

        <a 
          href="/selection" 
          className="btn-industrial inline-block border border-[var(--fg)] px-12 py-4 hover:bg-[#BC2026] hover:border-[#BC2026] transition-all duration-500"
        >
          INITIATE_COLLECTION
        </a>
      </div>

      <div className="absolute bottom-12 left-12 hidden md:block">
        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest leading-relaxed">
          Industrial Art Machine<br/>
          RGRM_v01.0 // Dead Link Theory<br/>
          Proprietary Research Pipeline
        </p>
      </div>
    </main>
  );
}
