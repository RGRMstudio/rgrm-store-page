import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-8 bg-white border-b border-gray-100">
      <Link href="/" className="flex items-center">
        <Image 
          src="/logo.png" 
          alt="RAGUIROMO Logo" 
          width={180} 
          height={40} 
          priority 
        />
      </Link>
      <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-light">
        <Link href="/registry" className="hover:text-gray-400 transition-colors">Registry</Link>
        <Link href="/lookbook" className="hover:text-gray-400 transition-colors">Lookbook</Link>
        <Link href="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
      </div>
    </nav>
  );
}
