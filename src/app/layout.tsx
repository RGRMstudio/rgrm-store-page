import type { Metadata } from "next";
// Self-hosted fonts (no build-time fetch from Google Fonts)
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/900.css";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
        url: "/og-image.jpg", 
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
        className="font-sans antialiased bg-black text-white overflow-x-hidden"
      >
        {/* Brutalist Concrete Noise Overlay */}
        <div className="brutalist-noise" aria-hidden="true" />
        
        {/* Global Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main>{children}</main>
        
        {/* Footer */}
        <Footer />
        
        {/* LUCCA AI WIDGET: TEMPORARILY DISABLED TO FIX BUILD */}
        {/* We will add this back once the store is live! */}
        
      </body>
    </html>
  );
}
