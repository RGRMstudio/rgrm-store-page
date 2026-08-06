import Link from 'next/link';
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";

export default function NotFound() {
  return (
    <main className="font-mono flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-black text-white">
      <h2 className="hero-title text-6xl font-black mb-4">404</h2>
      <p className="text-accentRed tracking-widest uppercase text-xs mb-8">
        [ SIGNAL_LOST // LINK_DEAD ]
      </p>
      <Link 
        href="/" 
        className="border border-white/30 px-8 py-3 uppercase tracking-[0.2em] text-xs font-bold hover:bg-accentRed hover:border-accentRed hover:text-black transition-all duration-300"
      >
        RETURN_TO_BASE
      </Link>
    </main>
  );
}
