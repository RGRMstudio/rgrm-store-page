import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RGRM Boutique | Bauhaus Registry',
  description: 'Minimalist Digital & Physical Artifacts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* CRITICAL: This variable renders your page content */}
        {children}
      </body>
    </html>
  );
}
