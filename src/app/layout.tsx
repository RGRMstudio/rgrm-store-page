import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import Script from 'next/script'; // Import the Script component

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
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <head>
        {/* Load Stripe globally */}
        <Script 
          src="https://js.stripe.com/v3/" 
          strategy="beforeInteractive" 
        />
      </head>
      <body className="scanline-effect">
        <div className="grain-overlay" />
        <nav className="nav-main">
          <span className="logo-text">RaGuiRoMo</span>
          <div className="status-container">
            <span className="status-led" />
            <span className="status-label">SIGNAL_DEPLOYED</span>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
