import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-6 border-b-4 border-black bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          {/* RGRM Logo Implementation */}
          <Image 
            src="/brand/logo.png" 
            alt="RGRM Studio Logo" 
            width={180} 
            height={60} 
            priority 
          />
        </Link>
        {/* Navigation Links */}
      </div>
    </header>
  );
}
