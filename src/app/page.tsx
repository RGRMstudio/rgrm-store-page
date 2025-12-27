export default function HomePage() {
  return (
<<<<<<< HEAD
    <main className="min-h-screen bg-white text-black font-sans">
      {/* GEOMETRIC NAVIGATION */}
      <nav className="flex justify-between border-b-4 border-black p-6 items-center">
        <h1 className="text-4xl font-black tracking-tighter uppercase">RaGuiRoMo</h1>
        <div className="space-x-8 hidden md:flex font-bold uppercase tracking-widest text-sm">
          <a href="#vision" className="hover:bg-yellow-400 px-2 transition-colors">Vision</a>
          <a href="#about" className="hover:bg-red-500 hover:text-white px-2 transition-colors">About</a>
          <a href="#products" className="hover:bg-blue-600 hover:text-white px-2 transition-colors">Menu</a>
        </div>
      </nav>

      {/* FUTURISTIC HERO SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-[80vh] border-b-4 border-black">
        <div className="flex flex-col justify-center p-12 bg-white">
          <h2 className="text-8xl font-black leading-none uppercase mb-6">
            Future <br /> <span className="text-red-600">Wear</span>
          </h2>
          <p className="text-xl max-w-md font-medium leading-relaxed">
            Minimalistic function meets geometric joy. Designed by us, printed for you.
=======
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
>>>>>>> e766690 (Fix: Add missing tailwind postcss dependency)
          </p>
          <button className="mt-8 bg-black text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-blue-600 transition-all self-start">
            Shop the Collection
          </button>
        </div>
<<<<<<< HEAD
        
        {/* ANIMATED PRODUCT DISPLAY AREA */}
        <div className="bg-yellow-400 border-l-4 border-black flex items-center justify-center relative overflow-hidden">
          <div className="w-64 h-64 bg-red-600 animate-bounce transition-all duration-1000"></div>
          <div className="absolute top-10 right-10 w-32 h-32 border-4 border-black rounded-full animate-spin-slow"></div>
          {/* We will replace these with Printful Product Images later */}
        </div>
      </section>

      {/* VISION & MISSION BLOCKS */}
      <section id="vision" className="grid grid-cols-1 md:grid-cols-3 border-b-4 border-black">
        <div className="p-12 border-r-4 border-black bg-blue-600 text-white">
          <h3 className="text-2xl font-black uppercase mb-4">Vision</h3>
          <p>Defining the aesthetics of the next decade through functional art.</p>
        </div>
        <div className="p-12 border-r-4 border-black">
          <h3 className="text-2xl font-black uppercase mb-4">Mission</h3>
          <p>Sustainably produced, high-quality prints that spark joy in every delivery.</p>
        </div>
        <div className="p-12 bg-white">
          <h3 className="text-2xl font-black uppercase mb-4">FAQ</h3>
          <p>Curious about shipping? Check our process below.</p>
        </div>
      </section>
    </main>
=======
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
>>>>>>> e766690 (Fix: Add missing tailwind postcss dependency)
  );
}
