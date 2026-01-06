import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ragui Romo | Identity Registry",
  description: "Bespoke digital identity certificates.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#D4AF37] selection:text-black">
        <header className="p-8 flex justify-center">
          {/* Logo will load from /public/logo.png */}
          <img src="/logo.png" alt="RGRM Logo" className="h-12 w-auto" />
        </header>
        <main>{children}</main>
        <footer className="p-10 text-center opacity-40 text-[10px] tracking-[0.2em] uppercase">
          © 2026 Ragui Romo Flagship
        </footer>
      </body>
    </html>
  );
}

