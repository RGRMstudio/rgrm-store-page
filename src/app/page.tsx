export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F7F2] text-black font-sans">
      {/* Dynamic Navigation */}
      <nav className="p-8 flex justify-between items-center border-b-4 border-black">
        <h1 className="text-4xl font-black tracking-tighter uppercase">RaGuiRoMo</h1>
        <div className="space-x-8 font-bold uppercase tracking-widest">
          <a href="/shop" className="hover:text-[#0066FF]">Shop</a>
          <a href="/cart" className="hover:text-[#FF0000]">Cart</a>
        </div>
      </nav>

      {/* Bauhaus Hero Section */}
      <section className="relative h-[80vh] flex items-center px-12 overflow-hidden">
        <div className="z-10 max-w-2xl">
          <h2 className="text-8xl font-black leading-none uppercase mb-6">
            Design <br /> <span className="text-[#0066FF]">Meets</span> <br /> Identity.
          </h2>
          <button className="bg-black text-white px-10 py-4 font-bold uppercase hover:bg-[#FFCC00] hover:text-black transition-colors">
            Explore Collection
          </button>
        </div>

        {/* Dynamic Abstract Shapes (Logo Inspiration) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full hidden lg:block">
          <div className="absolute w-64 h-64 bg-[#0066FF] rounded-full top-10 right-20 animate-pulse" />
          <div className="absolute w-80 h-80 bg-[#FF0000] top-40 right-40 rotate-12" />
          <div className="absolute w-96 h-48 bg-[#FFCC00] bottom-20 right-10" />
        </div>
      </section>
    </main>
  );
}
