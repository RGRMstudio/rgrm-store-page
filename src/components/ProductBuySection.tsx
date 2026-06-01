'use client';

import { useState } from 'react';
import VariantSelector from '@/components/VariantSelector';
import BuyButton from '@/components/BuyButton';

interface Variant {
  _key?: string;
  size: string;
  printfulVariantId: string;
  inStock: boolean;
  price?: number;
}

interface ProductBuySectionProps {
  variants: Variant[];
  productId: string;
  price: number | null;
  name: string;
  thumbnail: string;
}

export default function ProductBuySection({ variants, productId, price, name, thumbnail }: ProductBuySectionProps) {
  // 1. Manage state locally in this Client Component
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  // 2. Function to handle size selection
  const handleSelect = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  if (!variants || variants.length === 0) {
    return <p className="text-gray-500">No variants available.</p>;
  }

  // Default to the first variant if none selected
  const currentVariant = selectedVariant || variants[0];

  // Handle null price - use 0 or variant price if available
  const displayPrice = price ?? currentVariant.price ?? 0;

  return (
    <div className="w-full space-y-6">
      {/* Pass the handler and current selection to the UI components */}
      <VariantSelector 
        variants={variants} 
        selectedSize={currentVariant.size}
        onSelectVariant={handleSelect} 
      />
      
      <BuyButton
        productId={productId}
        variantId={currentVariant.printfulVariantId}
        price={displayPrice}
        name={name}
        thumbnail={thumbnail}
        size={currentVariant.size}
      />
    </div>
  );
}
