import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RGRM STUDIO | STRUCTURAL STUDIES",
  description: "Exclusive Manifesto Posters and design products for architectural minds.",
  keywords: ["Manifesto Poster", "Structural Studies", "RGRM", "Design Store"],
  metadataBase: new URL("https://www.raguiromo.store"),
  openGraph: {
    title: "RGRM STUDIO",
    description: "Design products for architectural minds.",
    url: "https://www.raguiromo.store",
    siteName: "RGRM STUDIO",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white`}>
        {/* Navigation could go here */}
        
        {children}
        
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
