'use client';

import Link from 'next/link';

export default function MegaMenu() {
  return (
    <div className="w-full bg-white border-b border-gray-100 py-12 px-8 animate-in fade-in slide-in-from-top-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-6">Collections</h3>
          <ul className="space-y-4 text-xs tracking-widest">
            <li><Link href="/collection/identity" className="hover:text-gray-400 transition-colors">Identity Series</Link></li>
            <li><Link href="/collection/bauhaus" className="hover:text-gray-400 transition-colors">Bauhaus Minimalist</Link></li>
            <li><Link href="/collection/bespoke" className="hover:text-gray-400 transition-colors">Bespoke Registry</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-6">The Studio</h3>
          <ul className="space-y-4 text-xs tracking-widest">
            <li><Link href="/about" className="hover:text-gray-400 transition-colors">Our Philosophy</Link></li>
            <li><Link href="/process" className="hover:text-gray-400 transition-colors">The Process</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
