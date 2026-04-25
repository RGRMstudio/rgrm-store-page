export const dynamic = 'force-dynamic';

export default function SelectionPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
          Structural Studies
        </h1>
        <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-12">
          Q4_2026_COLLECTION_LIVE
        </p>
        
        <div className="border border-white/10 p-8 rounded-lg">
          <p className="text-gray-300 font-mono mb-4">
            Products coming soon...
          </p>
          <p className="text-gray-500 text-xs font-mono">
            We're preparing something amazing
          </p>
        </div>
      </div>
    </main>
  );
}
