import type { Metadata } from "next";
import dynamic from 'next/dynamic';

// Dynamically import components to prevent server-side crashes
const Navbar = dynamic(() => import('@/components/Navbar'), { 
  ssr: false, // Render only on client
  loading: () => <div className="h-16 bg-black" /> // Fallback while loading
});

const Footer = dynamic(() => import('@/components/Footer'), { 
  ssr: false, // Render only on client
  loading: () => <div className="h-24 bg-black" /> // Fallback while loading
});

export const metadata: Metadata = {
  title: "RaGuiRoMo | Industrial Art Machine",
  description: "Structural Studies by RaGuiRoMo Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Using inline styles to guarantee no CSS build errors */}
      <body style={{ background: '#050505', color: '#f5f5f5', fontFamily: 'monospace', margin: 0 }}>
        <Navbar />
        <main style={{ minHeight: '80vh', padding: '2rem' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
