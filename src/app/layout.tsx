import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RGRM Boutique | Bauhaus Registry',
  description: 'Digital Registry and Physical Artifacts by RGRM Studio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* This renders the content of page.tsx */}
        {children}
      </body>
    </html>
  );
}
