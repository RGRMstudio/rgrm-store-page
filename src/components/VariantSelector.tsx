'use client';

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
  selectedSize: string | null;
  onSelectVariant: (variant: Variant) => void;
}

export default function VariantSelector({ variants, selectedSize, onSelectVariant }: VariantSelectorProps) {

  if (!variants || variants.length === 0) {
    return (
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Size</p>
        <p className="text-sm text-gray-400">One Size</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs uppercase tracking-[0.2em] text-gray-400">
          Select Size
        </h3>
        <button className="text-xs text-gray-500 underline hover:text-white transition-colors">
          Size Guide
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {variants.map((variant, index) => {
          const isSelected = selectedSize === variant.size;
          const isOutOfStock = !variant.inStock;

          return (
            <motion.button
              key={variant._key || variant.size}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => !isOutOfStock && onSelectVariant(variant)}
              disabled={isOutOfStock}
              className={`
                relative h-12 border text-sm font-medium tracking-wider transition-all duration-300
                ${isSelected 
                  ? 'border-[#BC2026] bg-[#BC2026]/10 text-white' 
                  : isOutOfStock
                  ? 'border-gray-800 text-gray-700 cursor-not-allowed'
                  : 'border-white/20 text-gray-300 hover:border-white hover:text-white'
                }
              `}
            >
              {variant.size}
              {isOutOfStock && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="absolute w-full h-px bg-gray-600 rotate-45" />
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
