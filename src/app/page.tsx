import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        {/* Brand Icon Placeholder */}
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-zinc-700 to-zinc-400 p-1 shadow-2xl">
          <div className="flex items-center justify-center w-full h-full bg-black rounded-xl">
             <Image
              src="/window.svg"
              alt="RGRM Logo"
              width={32}
              height={32}
              priority
              className="invert opacity-80"
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter uppercase italic">
            RGRM<span className="text-zinc-500">STORE</span>
          </h1>
          <p className="text-zinc-400 font-mono text-sm sm:text-base tracking-widest uppercase">
            Elevated Essentials // Limited Release
          </p>
        </div>

        {/* Coming Soon & Action */}
        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="px-4 py-1 border border-zinc-800 rounded-full bg-zinc-900/50 text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
            Online Experience Coming 2025
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button className="h-12 px-8 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all uppercase tracking-wider w-full sm:w-auto">
              Notify Me
            </button>
            <a 
              href="https://github.com/RGRMstudio" 
              target="_blank" 
              className="h-12 px-8 rounded-full border border-zinc-800 flex items-center justify-center text-sm font-bold hover:bg-zinc-900 transition-all uppercase tracking-wider w-full sm:w-auto"
            >
              The Studio
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex flex-col gap-2 items-center text-zinc-600">
        <p className="text-[10px] uppercase tracking-widest font-medium">
          © {new Date().getFullYear()} RGRM STUDIO. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
