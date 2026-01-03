import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// Professional sans-serif font for the Bauhaus aesthetic
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RaGuiRoMo Store | Identity & Design",
  description: "Minimalistic, chic, and Bauhaus-inspired designs curated by RaGuiRoMo.",
  metadataBase: new URL("https://www.raguiromo.store"),
  openGraph: {
    title: "RaGuiRoMo Store",
    description: "Modern Design Meets Pure Identity.",
    url: "https://www.raguiromo.store",
    siteName: "RaGuiRoMo",
    images: [
      {
        url: "/og-image.png", // Your Bauhaus logo for social sharing
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
        
        {/* Bauhaus Structural Frame: A permanent geometric border around the entire site */}
        <div className="min-h-screen flex flex-col border-8 border-black m-2 md:m-4">
          <main className="flex-grow">
            {children}
          </main>
        </div>

        {/* Real-time Visitor Insights */}
        <Analytics />
      </body>
    </html>
  );
}
