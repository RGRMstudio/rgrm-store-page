import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap' 
});

export const metadata: Metadata = {
  title: "RaGuiRoMo Store",
  description: "Official RGRMstore Identity Registry - Authenticated Design & Identity Modules.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased bg-white text-black selection:bg-yellow-400">
        
        {/* Main Application Content */}
        {children}

        {/* 1. Vercel Performance Suite */}
        <Analytics />
        <SpeedInsights />

        {/* 2. Loops.so Tracking Script 
            Note: This script enables Loops to track events and identify users 
            directly from the frontend for your RGRM Identity Registry.
        */}
        <Script 
          src="https://app.loops.so/scripts/track.js" 
          strategy="afterInteractive" 
          data-loops-id={process.env.d5a8e958b2e9dda1ba7dda42e0dbe8b5} 
        />
        
      </body>
    </html>
  );
}
