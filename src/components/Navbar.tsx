// src/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-8 border-black px-6 py-4 md:px-12 flex justify-between items-center">
      <Link href="/" className="group">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
          RaGuiRoMo <span className="text-[#0066FF]">Store</span>
        </h1>
      </Link>
      <div className="flex items-center space-x-8 md:space-x-12 font-black uppercase tracking-widest text-sm">
        <Link href="/shop" className="hover:text-[#FF0000]">Shop</Link>
        <Link href="/cart" className="relative w-10 h-10 border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
          0
        </Link>
      </div>
    </nav>
  );
}

