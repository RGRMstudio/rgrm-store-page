import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-6 border-b-4 border-black bg-white flex justify-between items-center">
      <Link href="/">
        <Image 
          src="/brand/logo.png" 
          alt="RGRM Studio" 
          width={200} 
          height={80} 
          priority 
        />
      </Link>
      <nav className="space-x-8 uppercase font-bold text-sm tracking-widest">
        <Link href="/registry" className="hover:text-red-600">Registry</Link>
        <Link href="/selection" className="hover:text-blue-600">Selection</Link>
      </nav>
    </header>
  );
}
