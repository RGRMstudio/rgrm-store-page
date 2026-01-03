import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// RaGuiRoMo Brand Typography
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RaGuiRoMo Store",
  description: "Modern Design meets Pure Identity. The official curated storefront of RaGuiRoMo.",
  metadataBase: new URL("https://www.raguiromo.store"),
  openGraph: {
    title: "RaGuiRoMo Store",
    description: "Pure Identity through Modern Design.",
    url: "https://www.raguiromo.store",
    siteName: "RaGuiRoMo",
    images: [
      {
        url: "/raguiromo-og.png", 
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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#F9F7F2] text-black antialiased`}>
        
        {/* RaGuiRoMo Architectural Frame */}
        <div className="min-h-screen flex flex-col border-8 border-black m-2 md:m-4">
          <main className="flex-grow">
            {children}
          </main>
        </div>

        {/* Performance & Visitor Tracking */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
