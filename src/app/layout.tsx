import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";

// Configure the primary font for RGRMstore
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/**
 * RGRMstore - Global Metadata Configuration
 * This ensures your site is indexed correctly as RaGuiRoMo Store.
 */
export const metadata: Metadata = {
  title: {
    default: "RaGuiRoMo Store",
    template: "%s | RaGuiRoMo Store",
  },
  description: "Official RGRMstore Identity Registry - Authenticated Design Artifacts.",
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon in your /public folder
  },
  manifest: "/site.webmanifest",
};

/**
 * Viewport configuration for mobile-first Bauhaus responsiveness
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
        {/* Main page content */}
        {children}

        {/* Vercel Analytics: Tracking page views and visitors 
          automatically on raguiromo.store 
        */}
        <Analytics />
      </body>
    </html>
  );
}
