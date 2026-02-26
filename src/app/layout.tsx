import React from 'react';
import type { Metadata, Viewport } from "next";
import { Oswald, Space_Grotesk } from "next/font/google";
import "./globals.css";

// --- IMPORTS: CONTEXT & COMPONENTS ---
import { CartProvider } from '@/context/CartContext';
import BlueprintGrid from '@/components/ui/BlueprintGrid';
import CartDrawer from '@/components/cart/CartDrawer';
import CartTrigger from '@/components/cart/CartTrigger';
import { RGRM_IDENTITY } from '@/lib/constants';

// --- 1. FONT CONFIGURATION ---
// "Headline" Font: Industrial, Condensed, Uppercase-heavy
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["400", "500", "700"], 
  display: "swap",
});

// "Body" Font: Technical, Geometric, Monospace-feel
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

// --- 2. METADATA (SEO) ---
export const metadata: Metadata = {
  metadataBase: new URL('https://www.rgrm.studio'), // Replace with your actual domain
  title: {
    template: `%s // ${RGRM_IDENTITY.shortName}`,
    default: `${RGRM_IDENTITY.shortName} // STRUCTURAL STUDIES`,
  },
  description: `${RGRM_IDENTITY.mission} ${RGRM_IDENTITY.tagline}`,
  keywords: ["fashion", "brutalist", "technical apparel", "streetwear", "structural design", "avant-garde"],
  authors: [{ name: RGRM_IDENTITY.founder }],
  creator: RGRM_IDENTITY.shortName,
  openGraph: {
    title: RGRM_IDENTITY.shortName,
    description: "Every garment is an acquisition of structural integrity.",
    siteName: RGRM_IDENTITY.shortName,
    locale: "en_US",
    type: "website",
    // images: ['/og-image.jpg'], // Add this later for social sharing
  },
  icons: {
    icon: "/favicon.ico", 
  },
};

// --- 3. VIEWPORT SETTINGS ---
// Crucial for preventing "white bars" on mobile scroll and locking zoom
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, 
};

// --- 4. ROOT LAYOUT ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${oswald.variable} 
          ${spaceGrotesk.variable} 
          antialiased 
          bg-black 
          text-white 
          min-h-screen 
          flex 
          flex-col
          overflow-x-hidden
          selection:bg-[#BC2026] 
          selection:text-white
        `}
      >
        {/* WRAPPER: Cart Context Provider */}
        <CartProvider>
          
          {/* LAYER 1: ATMOSPHERE (Backgrounds) */}
          <BlueprintGrid />
          <div className="bg-noise" /> {/* Defined in globals.css */}

          {/* LAYER 2: GLOBAL UI (Floating Elements) */}
          <CartTrigger />

          {/* LAYER 3: PAGE CONTENT */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>

          {/* LAYER 4: OVERLAYS (Drawers/Modals) */}
          <CartDrawer />
          
        </CartProvider>
      </body>
    </html>
  );
}
