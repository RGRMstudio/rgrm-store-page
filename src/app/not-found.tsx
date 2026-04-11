import Link from 'next/link';
import { JetBrains_Mono } from 'next/font/google';

// Define the font so the build doesn't crash
const mono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono' 
});

export default function NotFound() {
  return (
    <main className={`${mono.variable} font-mono flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-[var(--bg)] text-[var(--fg)]`}>
      <h2 className="text-6xl font-black mb-4">404</h2>
      <p className="text-[#BC2026] tracking-widest uppercase text-xs mb-8">
        [ SIGNAL_LOST // LINK_DEAD ]
      </p>
      <Link 
        href="/" 
        className="btn-industrial border border-[var(--fg)] px-8 py-3 hover:bg-[#BC2026] hover:border-[#BC2026] transition-all"
      >
        RETURN_TO_BASE
      </Link>
    </main>
  );
}
