// src/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-8 border-black px-6 py-4 md:px-12 flex justify-between items-center">
      {/* Brand Identity */}
      <Link href="/" className="group">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter transition-transform group-hover:scale-105">
          RaGuiRoMo <span className="text-[#0066FF]">Store</span>
        </h1>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 md:space-x-12 font-black uppercase tracking-widest text-sm md:text-base">
        <Link href="/shop" className="hover:text-[#FF0000] transition-colors">Shop</Link>
        <Link href="/about" className="hover:text-[#FFCC00] transition-colors">About</Link>
        
        {/* Dynamic Cart Icon Block */}
        <Link href="/cart" className="relative group">
          <div className="w-10 h-10 border-4 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
            <span className="text-xs">0</span>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    </nav>
  );
}
