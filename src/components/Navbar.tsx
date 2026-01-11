'use client';

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 mix-blend-difference px-6 py-8 flex justify-between items-end">
      <div className="flex flex-col">
        <Link href="/" className="text-white text-2xl font-black leading-none">
          RGRM&apos;S REGISTRY
        </Link>
        <span className="text-white text-[8px] uppercase tracking-[0.3em] mt-1">
          The Artist&apos;s Essential
        </span>
      </div>

      <div className="flex gap-8 text-white text-[10px] uppercase tracking-widest font-bold">
        <Link href="/archive" className="hover:line-through transition-all">
          Archive
        </Link>
        <Link href="/cart" className="hover:line-through transition-all">
          My &quot;Selection&quot;
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
