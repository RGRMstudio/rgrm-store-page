import React from 'react';
import type { Metadata, Viewport } from "next";
import { Oswald, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

// --- IMPORTS: CONTEXT & COMPONENTS ---
import { CartProvider } from '@/context/CartContext';
import BlueprintGrid from '@/components/ui/BlueprintGrid';
import CartDrawer from '@/components/cart/CartDrawer';
import CartTrigger from '@/components/cart/CartTrigger';
import { RGRM_IDENTITY } from '@/lib/constants';

// --- 1. FONT CONFIGURATION ---
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["400", "500", "700"], 
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

// --- 2. METADATA (SEO) ---
export const metadata: Metadata = {
  metadataBase: new URL('https://www.raguiromo.store'),
  title: {
    template: `%s // ${RGRM_IDENTITY.shortName}`,
    default: `${RGRM_IDENTITY.shortName} // STRUCTURAL STUDIES`,
  },
  description: `${RGRM_IDENTITY.mission} ${RGRM_IDENTITY.tagline}`,
  keywords: ["fashion", "brutalist", "technical apparel", "streetwear", "structural design", "avant-garde"],
  authors: [{ name: RGRM_IDENTITY.founder }],
  creator: RGRM_IDENTITY.shortName,
  verification: {
    google: 'c907f11ae8e1f504',
  },
  openGraph: {
    title: RGRM_IDENTITY.shortName,
    description: "Every garment is an acquisition of structural integrity.",
    siteName: RGRM_IDENTITY.shortName,
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico", 
  },
};

// --- 3. VIEWPORT SETTINGS ---
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
          selection​​​​​​​​​​​​​​​​
