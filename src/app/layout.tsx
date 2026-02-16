import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { RGRM_IDENTITY, RGRM_SEO, RGRM_CHANNELS } from "@/lib/constants";

// RGRM Typography Standard
const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-headline", 
  weight: ["700", "900"] 
});

const roboto = Roboto({ 
  subsets: ["latin"], 
  variable: "--font-body", 
  weight: ["400", "500"] 
});

export const metadata: Metadata = {
  title: RGRM_SEO.defaultTitle,
  description: RGRM_SEO.description,
  keywords: RGRM_SEO.keywords,
  authors: [{ name: RGRM_IDENTITY.founder }],
  openGraph: {
    title: RGRM_IDENTITY.name,
    description: RGRM_SEO.description,
    url: RGRM_CHANNELS.storefront,
    siteName: RGRM_IDENTITY.name,
    images: [
      {
        url: RGRM_SEO.ogImage,
        width: 1200,
        height: 630,
        alt: `${RGRM_IDENTITY.name} | ${RGRM_IDENTITY.tagline}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: RGRM_IDENTITY.name,
    description: RGRM_IDENTITY.tagline,
    images: [RGRM_SEO.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body className="antialiased bg-black text-white">
        {children}
        
        {/* Chatbase Studio Concierge Script */}
        <script
          src="https://www.chatbase.co/embed.min.js"
          data-chatbot-id={process.env.NEXT_PUBLIC_CHATBASE_CHATBOT_ID}
          data-domain="www.raguiromo.store"
          defer
        >
        </script>
      </body>
    </html>
  );
}
