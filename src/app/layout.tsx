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
      {/* "scanline-effect" must be defined in your globals.css */}
      <body className="scanline-effect bg-white text-black min-h-screen">
        <div className="grain-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.03]" />
        
        <nav className="nav-main sticky top-0 z-40 w-full border-b border-black/5 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
          <span className="logo-text font-black uppercase tracking-tighter">RaGuiRoMo</span>
          <div className="status-container flex items-center gap-2">
            <span className="status-led w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="status-label font-mono text-[10px] tracking-widest uppercase">SIGNAL_DEPLOYED</span>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
