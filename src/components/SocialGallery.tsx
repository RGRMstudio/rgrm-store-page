'use client';

import { Instagram, Twitter, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function SocialGallery() {
  // Replace these with your actual social media handles
  const socials = [
    { name: 'Instagram', icon: <Instagram size={18} />, url: 'https://instagram.com/raguiromo' },
    { name: 'Twitter', icon: <Twitter size={18} />, url: 'https://twitter.com/raguiromo' },
  ];

  return (
    <section className="py-24 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-4">
            Digital Presence
          </h2>
          <div className="flex justify-center gap-8">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-[#D4AF37] transition-colors"
                aria-label={social.name}
              >
                {social.icon}
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Visual Grid: Placeholders for your curated social feed */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item} 
              className="aspect-square bg-gray-50 border border-gray-100 flex items-center justify-center group cursor-pointer overflow-hidden"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ExternalLink size={14} className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
