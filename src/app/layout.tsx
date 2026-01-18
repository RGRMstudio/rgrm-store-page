import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Configure the RGRM typography
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap' 
});

/**
 * RGRMstore - Global Metadata Configuration
 * 2026 Production Standard
 */
export const metadata: Metadata = {
  title: {
    default: "RaGuiRoMo Store",
    template: "%s | RaGuiRoMo Store",
  },
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

        {/* RGRM Performance & Traffic Suite:
          - Analytics: Tracks visitors and behavior.
          - Speed Insights: Tracks Core Web Vitals (LCP, FID, CLS).
        */}
        <Analytics />
        <SpeedInsights />
        
      </body>
    </html>
  );
}
