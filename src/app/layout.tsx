import { Montserrat, Roboto } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-headline',
  weight: ['700'] 
});

const roboto = Roboto({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['400', '500'] 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body className="bg-black text-white antialiased selection:bg-red-600">
        <nav className="border-b border-white/10 p-6 flex justify-between items-center">
          <span className="font-headline text-2xl tracking-tighter">RGRM STUDIO</span>
          <div className="space-x-8 font-body text-sm uppercase tracking-widest">
            <a href="#narrative" className="hover:text-red-600 transition-colors">Narrative</a>
            <a href="#gallery" className="hover:text-red-600 transition-colors">The Gallery</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
