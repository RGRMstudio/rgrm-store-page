"use client";
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: any) {
  // 1. ADD THIS GUARD CLAUSE TO PREVENT THE CRASH
  if (!products || !Array.isArray(products)) {
    return (
      <section className="px-8 py-20 bg-white">
        <div className="animate-pulse font-mono text-xs text-gray-400">
          INITIALIZING RGRM ASSETS...
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-20 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 border-l-4 border-rgrm-blue pl-6"
      >
        <h2 className="font-display text-4xl uppercase tracking-tighter">Current Drops</h2>
        <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mt-2">Collection 01: The Origin</p>
      </motion.div>

      {/* Asymmetrical Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
        {products.map((product: any, index: number) => {
          const isLarge = index === 0 || index === 5;
          const isTall = index === 2 || index === 6;

          return (
            <div 
              key={product.id} 
              className={`${isLarge ? 'md:col-span-2 md:row-span-2' : isTall ? 'md:row-span-2' : ''}`}
            >
              <ProductCard 
                title={product.name} 
                price="45.00" 
                image={product.thumbnail_url}
                color={index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'red' : 'yellow'}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
