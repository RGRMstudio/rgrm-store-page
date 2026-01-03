import Link from 'next/link';

/**
 * RaGuiRoMo Store: Final Navigation & Organic Marketing Bar
 */

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Organic Marketing Ticker */}
      <div className="bg-[#FF0000] text-white py-2 border-b-4 border-black overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee font-black uppercase tracking-widest text-xs md:text-sm">
          Limited Identity Drop 001 // No Restocks // Join the RaGuiRoMo Registry for Access //&nbsp;
          Limited Identity Drop 001 // No Restocks // Join the RaGuiRoMo Registry for Access //&nbsp;
        </div>
      </div>

      {/* Brand Navigation */}
      <nav className="bg-white border-b-8 border-black px-6 py-4 md:px-12 flex justify-between items-center">
        <Link href="/" className="group">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter transition-transform group-hover:scale-105">
            RaGuiRoMo <span className="text-[#0066FF]">Store</span>
          </h1>
        </Link>

        <div className="flex items-center space-x-6 md:space-x-12 font-black uppercase tracking-widest text-[10px] md:text-sm">
          <Link href="/shop" className="hover:text-[#FF0000] transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-[#FFCC00] transition-colors">About</Link>
          
          <Link href="/cart" className="relative group">
            <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
              <span className="text-xs">0</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </nav>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: inline-block; animation: marquee 20s linear infinite; }
      `}</style>
    </header>
  );
}
