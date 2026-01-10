import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google"; // Using Mono for that industrial look
import Script from "next/script";
import "./globals.css";

// 1. Configure the Bauhaus-style Monospace font
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Official Metadata for raguiromo.store
export const metadata: Metadata = {
  title: "RGRM | Bauhaus Identity Registry",
  description: "Official store for Bauhaus-standard identity registration and terminal assets.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 3. STRIPE BUY BUTTON SCRIPT
          We load this with 'lazyOnload' so it doesn't block 
          the initial render of your Bauhaus animations.
        */}
        <Script
          src="https://js.stripe.com/v3/buy-button.js"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${geistMono.variable} font-mono antialiased bg-white text-black`}>
        {/* The 'grid' background effect can be added here globally 
           to maintain the Bauhaus aesthetic across all pages. 
        */}
        <div className="min-h-screen relative overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
