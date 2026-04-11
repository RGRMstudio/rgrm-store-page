import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import Script from 'next/script';

const mono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono' 
});

const sans = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans', 
  weight: ['900'] 
});

export const metadata: Metadata = {
  title: 'RaGuiRoMo | Industrial Art Machine',
  description: 'Autonomous research-to-product pipeline.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable} antialiased`}>
      <head>
        {/* Load Stripe globally with strategy to prevent hydration errors */}
        <Script 
          src="https://js.stripe.com/v3/" 
          strategy="beforeInteractive" 
        />
      </head>
      
      {/* Background is set to var(--bg) from globals.css to ensure industrial dark theme */}
      <body className="scanline-effect bg-[var(--bg)] text-[var(--fg)] min-h-screen font-mono">
        
        {/* Grain overlay for the Industrial Grunge aesthetic */}
        <div className="grain-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.05]" />
        
        {/* Nav optimized for dark mode with industrial borders */}
        <nav className="nav-main sticky top-0 z-40 w-full border-b border-[var(--industrial-border)] bg-[var(--bg)]/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
          <span className="logo-text font-black uppercase tracking-tighter text-2xl">
            RaGuiRoMo
          </span>
          
          <div className="status-container flex items-center gap-2">
            <span className="status-led w-2 h-2 rounded-full bg-[#BC2026] shadow-[0_0_8px_#BC2026] animate-pulse" />
            <span className="status-label font-mono text-[10px] tracking-widest uppercase text-[#BC2026]">
              SIGNAL_DEPLOYED
            </span>
          </div>
        </nav>

        {/* Main content area */}
        <div className="relative z-10">
          {children}
        </div>

      </body>
    </html>
  );
}
