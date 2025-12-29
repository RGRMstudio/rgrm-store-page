import Link from 'next/link';

export default function RGRMSuccess() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-black font-sans selection:bg-red-500 selection:text-white flex flex-col">
      
      {/* SUCCESS HEADER */}
      <header className="border-b-8 border-black grid grid-cols-1 md:grid-cols-2 bg-yellow-400">
        <div className="p-10 border-r-0 md:border-r-8 border-black flex items-center">
          <h1 className="text-7xl font-black uppercase italic tracking-tighter">RGRM</h1>
        </div>
        <div className="p-10 flex items-center bg-black text-white justify-center overflow-hidden">
          <div className="w-10 h-10 bg-red-600 rounded-full animate-ping mr-6"></div>
          <span className="font-bold tracking-[0.2em] uppercase text-xl italic">Acquisition Confirmed</span>
        </div>
      </header>

      {/* CONFIRMATION DATA SECTION */}
      <section className="flex-grow flex items-center justify-center p-8 md:p-20">
        <div className="max-w-4xl w-full border-8 border-black bg-white shadow-[30px_30px_0px_0px_rgba(220,38,38,1)] p-10 md:p-20 relative">
          
          {/* DECORATIVE GEOMETRIC ELEMENTS */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600 border-l-8 border-b-8 border-black"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow-400 border-t-8 border-r-8 border-black rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

          <h2 className="text-6xl md:text-8xl font-black uppercase leading-none mb-10 tracking-tighter">
            Order <br /> <span className="text-red-600 italic">Synchronized</span>
          </h2>

          <div className="space-y-8 border-t-8 border-black pt-10">
            <p className="text-2xl md:text-3xl font-bold leading-tight uppercase italic">
              Your acquisition has been processed through the **RGRM Direct API Tunnel**.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-black uppercase tracking-widest opacity-80">
              <div className="p-4 bg-gray-100 border-4 border-black">
                Status: Logistical Processing
              </div>
              <div className="p-4 bg-gray-100 border-4 border-black">
                Origin: Global RGRM Studio
              </div>
            </div>

            <p className="text-lg font-medium">
              A detailed logistical manifest (receipt) has been dispatched to your digital inbox. 
              The physical manifest will begin production immediately.
            </p>
          </div>

          <div className="mt-16">
            <Link 
              href="/" 
              className="inline-block bg-black text-white px-12 py-6 text-2xl font-black uppercase hover:bg-red-600 transition-all hover:-translate-y-2 active:translate-y-0"
            >
              Return to Catalog →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER STRIP */}
      <footer className="border-t-8 border-black p-8 bg-white flex justify-between items-center font-black uppercase text-[10px] tracking-[0.4em]">
        <div>Protocol: Success // Code: 200</div>
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-red-600"></div>
          <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
          <div className="w-6 h-6 bg-blue-600 transform rotate-45"></div>
        </div>
        <div>RGRM Studio v1.0</div>
      </footer>
    </main>
  );
}
