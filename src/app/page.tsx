import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center sm:text-left">
        {/* Brand Logo or Icon */}
        <div className="bg-white p-2 rounded-lg">
          <Image
            src="/window.svg"
            alt="RGRM Store Logo"
            width={40}
            height={40}
            priority
            className="invert"
          />
        </div>

        {/* Hero Section */}
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter uppercase">
          RGRM Store
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-400 max-w-md font-mono">
          Elevated essentials for the modern lifestyle. Our online collection is currently under construction.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-10 font-bold"
            href="mailto:contact@rgrm.studio"
          )
          >
            Notify Me
          </a>
          <a
            className="rounded-full border border-solid border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-5 sm:min-w-44"
            href="https://github.com/RGRMstudio"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow our Progress
          </a>
        </div>
      </main>

      {/* Footer info */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-gray-500 text-xs uppercase tracking-widest">
        <p>© 2025 RGRM Studio</p>
        <p>Built with Next.js</p>
      </footer>
    </div>
  );
}
