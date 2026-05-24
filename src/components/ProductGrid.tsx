'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for now - we'll connect to Sanity next
const mockProducts = [
  {
    _id: '1',
    name: 'RGRM - Avril Women\'s Cotton Crew Neck T-Shirt',
    slug: 'rgrm-avril-women-s-cotton-crew-neck-t-shirt',
    thumbnail: 'https://files.cdn.printful.com/files/d29/d2998a1ab2f924a3deb5c8686cf3cb48_preview.png',
    price: 45.00,
  },
  {
    _id: '2',
    name: 'RGRM - Monolith Hoodie',
    slug: 'rgrm-monolith-hoodie',
    thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    price: 89.00,
  },
  {
    _id: '3',
    name: 'RGRM - Arch 01 Track Jacket',
    slug: 'rgrm-arch-01-track-jacket',
    thumbnail: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    price: 125.00,
  },
];

export default function ProductGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="grid grid-cols-1 gap-y-20 gap-x-12 md:grid-cols-2 lg:grid-cols-3">
      {mockProducts.map((product, index) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1] // McQueen-style easing
          }}
          className={`group ${index % 3 === 0 ? 'md:mt-20' : ''}`} // Asymmetric offset
        >
          <Link href={`/selection/${product.slug}`} className="block">
            {/* Image Container */}
            <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-darkGray">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
              
              {/* Quick View Overlay */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-black/90 p-4 text-center transition-transform duration-500 group-hover:translate-y-0">
                <span className="text-xs uppercase tracking-[0.2em] text-white">
                  Quick View
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="text-center">
              <h3 className="mb-2 text-lg font-serif uppercase tracking-wide">
                {product.name}
              </h3>
              <p className="text-sm text-gray-400">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
