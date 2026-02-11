export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] border-b border-white/10">
        {/* Left Side: The Narrative */}
        <div className="p-12 flex flex-col justify-center space-y-6">
          <h1 className="text-6xl md:text-8xl leading-none">
            Phase 01:<br />
            <span className="text-red-600">Brutalist</span><br />
            Lineage
          </h1>
          <p className="max-w-md text-gray-400 text-lg">
            A study in raw structural integrity. Bridging the gap between 
            architectural precision and modern streetwear.
          </p>
          <button className="bg-white text-black px-8 py-4 uppercase font-bold hover:bg-red-600 hover:text-white transition-all w-fit">
            Acquire Study
          </button>
        </div>

        {/* Right Side: The Visual (Your Image) */}
        <div className="relative bg-zinc-900 flex items-center justify-center p-12 overflow-hidden">
          {/* REPLACE 'brutalist-tee.png' with your actual file in /public folder */}
          <img 
            src="/your-image-here.png" 
            alt="RGRM Study 001" 
            className="w-full h-auto object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-4 right-4 text-[10px] text-white/20 rotate-90">
            RGRM_SPEC_001_V01
          </div>
        </div>
      </section>
    </main>
  );
}
