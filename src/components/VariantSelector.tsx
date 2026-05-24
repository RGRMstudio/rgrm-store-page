'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Variant {
  _key?: string;
  size: string;
  printfulVariantId: string;
  inStock: boolean;
  price?: number;
}

interface VariantSelectorProps {
  variants: Variant[];
  onSelectVariant: (variant: Variant) => void;
}

export default function VariantSelector({ variants, onSelectVariant }: VariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const handleSelect = (variant: Variant) => {
    if (!variant.inStock) return;
    
    setSelectedVariant(variant.size);
    onSelectVariant(variant);
  };

  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm uppercase tracking-[0.2em] text-gray-400">
          Select Size
        </h3>
        <button className="text-xs text-gray-500 underline hover:text-white transition-colors">
          Size Guide
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {variants.map((variant, index) => {
          const isSelected = selectedVariant === variant.size;
          const isOutOfStock = !variant.inStock;

          return (
            <motion.button
              key={variant._key || variant.size}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelect(variant)}
              disabled={isOutOfStock}
              className={`
                relative h-14 border text-sm font-medium transition-all duration-300
                ${isSelected 
                  ? 'border-blood-red bg-bloodRed/10 text-white' 
                  : isOutOfStock
                  ? 'border-gray-700 text-gray-600 cursor-not-allowed'
                  : 'border-white/20 text-white hover:border-white hover:bg-white/5'
                }
              `}
            >
              {variant.size}
              {isOutOfStock && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="absolute w-full h-px bg-gray-600 rotate-45" />
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Stock Status */}
      {selectedVariant && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-xs text-green-400"
        >
          ✓ Size available - Ready to ship
        </motion.p>
      )}
    </div>
  );
}
