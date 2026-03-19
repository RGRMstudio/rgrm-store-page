'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RGRMProduct } from '@/lib/products';

interface Props {
  product: RGRMProduct;
}

export default function ProductDetail({ product }: Props) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!selectedSize) {
      setError('Please select a size before continuing.');
      return;
    }

    const variant = product.variants.find((v) => v.size === selectedSize);
    if (!variant) {
      setError('Selected size not available.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: product.stripePriceId,
          printfulVariantId: variant.variantId,
          productName: product.name,
          size: selectedSize,
        }),
      });

      const data = await res.json();

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        setError('Checkout failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT: Image */}
        <div className="aspect-[3/4] relative bg-neutral-900 border border-white/10">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/10 font-black text-4xl">NO_IMG</span>
            </div>
          )}
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col justify-between gap-8">
          <div className="space-y-6">

            {/* ID + Category */}
            <div>
              <p className="text-rgrm-red text-[10px] font-mono tracking-widest uppercase">
                {product.id} // {product.category}
              </p>
            </div>

            {/* Name */}
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-white/60 text-sm tracking-wide leading-relaxed border-l-2 border-white/20 pl-4">
              {product.description}
            </p>

            {/* Price */}
            <p className="text-3xl font-bold font-mono">
              ${product.price}.00 USD
            </p>

            {/* Size Selector */}
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.size}
                    onClick={() => setSelectedSize(variant.size)}
                    disabled={!variant.inStock}
                    className={`px-4 py-2 border text-xs font-bold uppercase tracking-widest transition-all duration-200
                      ${!variant.inStock
                        ? 'border-white/10 text-white/20 cursor-not-allowed'
                        : selectedSize === variant.size
                        ? 'border-rgrm-red bg-rgrm-red text-white'
                        : 'border-white/20 text-white hover:border-white'
                      }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Error Message */}
          {error && (
            <p className="text-rgrm-red text-xs font-mono tracking-widest border border-rgrm-red/30 p-3">
              ⚠ {error}
            </p>
          )}

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={loading || product.status === 'SOLD OUT'}
            className="group relative w-full px-8 py-5 bg-transparent border border-white text-white overflow-hidden transition-all duration-300 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
            <span className="relative z-10 text-xs font-bold uppercase tracking-[0.3em]">
              {loading ? 'Connecting...' : product.status === 'SOLD OUT' ? 'ARCHIVED' : 'ACQUIRE THIS PIECE'}
            </span>
          </button>

          {/* Fine print */}
          <p className="text-white/20 text-[9px] uppercase tracking-widest font-mono text-center">
            Shipped via Printful · Secured by Stripe · Made to Order
          </p>

        </div>
      </div>
    </main>
  );
}
