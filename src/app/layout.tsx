import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RaGuiRoMo | Industrial Art Machine",
  description: "Structural Studies by RaGuiRoMo Studio. Industrial art clothing manufactured on demand.",
  openGraph: {
    title: "RaGuiRoMo Store",
    description: "Structural Studies by RaGuiRoMo Studio.",
    url: "https://www.raguiromo.store",
    siteName: "RaGuiRoMo Store",
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://www.raguiromo.store"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable} antialiased`}>
      <head>
        <Script 
          src="https://js.stripe.com/v3/" 
          strategy="beforeInteractive" 
        />
      </head>
      
      <body className="scanline-effect bg-[var(--bg)] text-[var(--fg)] min-h-screen font-mono relative">
        {/* Industrial Grain Overlay */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.05]"
          style={{
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />

        <Navbar />

        <main className="relative z-10">
          {children}
        </main>

        <Analytics />
      </body>
    </html>
  );
}
