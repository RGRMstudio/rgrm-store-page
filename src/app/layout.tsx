// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';

// Typography for the "Research Log" aesthetic
const mono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono',
  display: 'swap',
});

// Typography for the "Neo-Minimalist" headers
const sans = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RaGuiRoMo | Industrial Art Machine',
  description: 'Autonomous research-to-product pipeline. Industrial Grunge & Internet Decay.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body className="scanlines">
        {/* Persistent Industrial Header */}
        <header className="border-industrial" style={{ 
          padding: '1.5rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: 'var(--background)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div className="gothic-font" style={{ fontSize: '1.8rem', letterSpacing: '-3px' }}>
            RaGuiRoMo
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="status-online"></span>
            <span style={{ 
              fontSize: '0.65rem', 
              color: '#39ff14', 
              fontWeight: 'bold',
              letterSpacing: '1px' 
            }}>
              STATUS: SIGNAL_DEPLOYED
            </span>
          </div>
        </header>

        {/* Main content area */}
        <main style={{ minHeight: 'calc(100vh - 80px)' }}>
          {children}
        </main>

        {/* Minimalist Industrial Footer */}
        <footer className="border-industrial" style={{ 
          padding: '2rem', 
          marginTop: '4rem',
          fontSize: '0.7rem',
          opacity: 0.5,
          textAlign: 'center'
        }}>
          <p>[RGRM_SYSTEM_v1.0] // ALL_RIGHTS_RESERVED // {new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}
