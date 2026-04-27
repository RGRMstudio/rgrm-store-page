export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
          NOT STYLE.<br />IDENTITY.
        </h1>
        
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          RaGuiRoMo Studio — where industrial aesthetics meet digital expression. 
          Exploring the intersection of structure, form, and creative disruption.
        </p>

        <a 
          href="/selection"
          className="inline-block px-8 py-4 border-2 border-[#BC2026] text-[#BC2026] hover:bg-[#BC2026] hover:text-white transition-all duration-300 font-mono uppercase tracking-wider"
        >
          INITIATE COLLECTION →
        </a>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-2 text-[#BC2026]">STRUCTURE</h3>
            <p className="text-gray-400 text-sm">
              Deconstructing visual language through geometric precision and raw materiality.
            </p>
          </div>
          
          <div className="border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-2 text-[#BC2026]">DISRUPTION</h3>
            <p className="text-gray-400 text-sm">
              Challenging conventional design paradigms with glitch aesthetics and digital decay.
            </p>
          </div>
          
          <div className="border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-2 text-[#BC2026]">EXPRESSION</h3>
            <p className="text-gray-400 text-sm">
              Transforming industrial concepts into wearable art and collectible pieces.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
