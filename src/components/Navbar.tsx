"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
      {/* LEFT — Status signal */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-rgrm-red shadow-[0_0_8px_#BC2026] animate-pulse" />
        <span className="text-[10px] font-mono text-rgrm-red tracking-widest uppercase">
          Signal Active
        </span>
      </div>

      {/* CENTER — Wordmark */}
      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2 font-sans font-black text-xl uppercase tracking-[-0.06em] text-rgrm-light hover:text-rgrm-red transition-colors duration-200"
      >
        RaGuiRoMo
      </Link>

      {/* RIGHT — Nav links */}
      <div className="flex items-center gap-6">
        <Link
          href="/selection"
          className="text-[11px] font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-200"
        >
          Selection
        </Link>
        <Link
          href="/about"
          className="text-[11px] font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-200"
        >
          Studio
        </Link>
      </div>
    </nav>
  );
}
