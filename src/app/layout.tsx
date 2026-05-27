import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LuccaWidget from "@/components/LuccaWidget";
import PageTransition from "@/components/PageTransition";

// Load McQueen-style fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RaGuiRoMo | Brutalist Lineage",
  description: "Wearable architecture. Phase 01.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-black text-white antialiased">
        {/* Subtle brutalist texture overlay */}
        <div className="brutalist-noise" aria-hidden="true" />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content with Transitions */}
        <main className="relative z-10 min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Lucca AI Widget */}
        <LuccaWidget />
      </body>
    </html>
  );
}
