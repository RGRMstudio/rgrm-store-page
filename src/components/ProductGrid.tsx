'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  thumbnail: string;
  price: number | null;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">No products available yet.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="grid grid-cols-1 gap-y-20 gap-x-12 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => {
        // Safe price handling
        const displayPrice = product.price != null 
          ? `$${Number(product.price).toFixed(2)}` 
          : 'Contact for Price';

        return (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className={`group ${index % 3 === 0 ? 'md:mt-20' : ''}`}
          >
            <Link href={`/selection/${product.slug.current}`} className="block">
              {/* Image Container - Optimized size */}
              <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-darkGray">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={index < 3} // Load first
