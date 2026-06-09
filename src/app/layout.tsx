import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Dynamically import Lucca with SSR disabled to prevent browser API errors during build
const LuccaWidget = dynamic(() => import("@/components/LuccaWidget"), { ssr: false });

// Brutalist Typography
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RaGuiRoMo | Brutalist Lineage",
  description: "Wearable architecture. Phase 01: Heavyweight garments crafted in the RGRM Studio. Free shipping over $100.",
  openGraph: {
    title: "RaGuiRoMo | Brutalist Lineage",
    description: "Wearable architecture. Phase 01.",
    url: "https://www.raguiromo.store",
    siteName: "RaGuiRoMo",
    images: [
      {
        url: "/og-image.jpg", // Make sure you have an og-image.jpg in your /public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body 
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-black text-white overflow-x-hidden`}
      >
        {/* Brutalist Concrete Noise Overlay */}
        <div className="brutalist-noise" aria-hidden="true" />
        
        {/* Global Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main>{children}</main>
        
        {/* Footer */}
        <Footer />
        
        {/* Lucca AI Chat Widget (Client-Side Only) */}
        <LuccaWidget />
      </body>
    </html>
  );
}
