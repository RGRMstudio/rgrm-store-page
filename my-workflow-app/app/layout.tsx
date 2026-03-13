import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter is the reliable standard for Next.js 14
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RGRM STORE",
  description: "RGRM Studio Registry & Identity System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
