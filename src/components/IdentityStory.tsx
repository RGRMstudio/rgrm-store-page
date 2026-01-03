// src/components/IdentityStory.tsx
export default function IdentityStory() {
  return (
    <section className="bg-white p-8 md:p-24 border-t-8 border-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Visual Identity Block */}
        <div className="relative">
          <div className="w-full aspect-square bg-[#0066FF] border-8 border-black flex items-center justify-center relative overflow-hidden group">
            <div className="absolute w-48 h-48 bg-[#FF0000] rounded-full -top-10 -left-10 group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute w-64 h-64 bg-[#FFCC00] rotate-45 -bottom-20 -right-20 group-hover:-rotate-45 transition-transform duration-700" />
            <h2 className="text-white text-6xl font-black uppercase z-10 mix-blend-difference">RGRM</h2>
          </div>
        </div>

        {/* Narrative Block */}
        <div className="space-y-8">
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Pure <span className="text-[#FF0000]">Identity</span> <br /> 
            Modern <span className="text-[#0066FF]">Design</span>
          </h3>
          <p className="text-xl font-bold leading-relaxed uppercase">
            RaGuiRoMo Store is not just a shop. It is a curated gallery where geometric precision meets human expression. 
          </p>
          <div className="border-l-8 border-[#FFCC00] pl-6 italic font-black text-2xl">
            "We strip away the noise to reveal the soul of the object."
          </div>
        </div>
      </div>
    </section>
  );
}
