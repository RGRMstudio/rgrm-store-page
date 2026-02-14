import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";

// RGRM Typography Standard
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["700", "900"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
});

// The RGRM Studio Identity Registry
export const metadata: Metadata = {
  title: "RaGuiRoMo Studio | Phase 01: Brutalist Lineage",
  description: "Architectural Streetwear by Raul Guillermo Rosario Morales. Form Follows Function.",
  keywords: ["RGRM", "RaGuiRoMo", "Architectural Streetwear", "Brutalist Fashion", "Raul Morales"],
  authors: [{ name: "Raul Guillermo Rosario Morales" }],
  openGraph: {
    title: "RaGuiRoMo Studio",
    description: "Bridging the gap between architectural precision and modern streetwear.",
    url: "https://raguiromo.store",
    siteName: "RGRM Studio",
    images: [
      {
        url: "/og-image.npg", // Ensure you upload a brand image to your public folder later
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RaGuiRoMo Studio",
    description: "Form Follows Function.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body className="antialiased">
        {children}
        
        {/* Chatbase Studio Concierge Script */}
        <script
          src="https://www.chatbase.co/embed.min.js"
          data-chatbot-id={process.env.gDsk1ohAYgzBh_NrHorAy}
          data-domain="www.raguiromo.store"
          defer
        >
        </script>
      </body>
    </html>
  );
}
