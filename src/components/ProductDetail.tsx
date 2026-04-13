'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RGRMProduct } from '@/lib/products';

interface Props {
  product: RGRMProduct;
}

export default function ProductDetail({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!selectedSize) {
      setError('SELECT A SIZE TO CONTINUE.');
      return;
    }
    const variant = product.variants.find((v) => v.size === selectedSize);
    if (!variant) {
      setError('SIZE UNAVAILABLE.');
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
        window.location.href = data.url;
      } else {
        setError('CHECKOUT FAILED. TRY AGAIN.');
      }
    } catch {
      setError('NETWORK ERROR. TRY AGAIN.');
    } finally {
      setLoading(false);
    }
  };

  const isSoldOut = product.status === 'SOLD OUT';

  return (
    <main className="min-h-screen bg-[#050505] text-rgrm-light">

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-4">
        <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
          <Link href="/" className="hover:text-white/50 transition-colors">RGRM</Link>
          {' // '}
          <Link href="/selection" className="hover:text-white/50 transition-colors">Selection</Link>
          {' // '}
          <span className="text-white/40">{product.name}</span>
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 pb-32 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-white/5 mt-4">

          {/* LEFT — IMAGE: capped height so it never buries content */}
          <div className="relative w-full aspect-[4/5] md:aspect-auto md:min-h-[600px] md:max-h-[85vh] md:sticky md:top-24 bg-rgrm-gray border-b md:border-b-0 md:border-r border-white/5 overflow-hidden">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-black text-white/10 text-5xl">—</span>
              </div>
            )}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-white/30 tracking-widest uppercase">
              ARTIFACT // {product.id || 'UNREGISTERED'}
            </div>
          </div>

          {/* RIGHT — DOSSIER */}
          <div className="flex flex-col p-6 md:p-12 gap-8">

            {/* Title block */}
            <div>
              <p className="font-mono text-[10px] text-rgrm-red tracking-[0.3em] uppercase mb-3">
                Structural Study // {product.category || 'RGRM Studio'}
              </p>
              <h1 className="font-sans font-black text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.9] tracking-[-0.04em]">
                {product.name}
              </h1>
            </div>

            {/* Spec lines */}
            <div className="space-y-0 border-t border-white/5">
              <div className="flex justify-between items-baseline py-3 border-b border-white/5">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Price</span>
                <span className="font-mono text-xl text-rgrm-light">
                  ${product.price}.00 <span className="text-xs text-white/30">USD</span>
                </span>
              </div>
              <div className="flex justify-between items-baseline py-3 border-b border-white/5">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Status</span>
                <span className="flex items-center gap-2 font-mono text-xs">
                  {isSoldOut ? (
                    <span className="text-white/30">ARCHIVED</span>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-rgrm-red animate-pulse" />
                      <span className="text-rgrm-red">AVAILABLE</span>
                    </>
                  )}
                </span>
              </div>
              <div className="flex justify-between items-baseline py-3 border-b border-white/5">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Fulfillment</span>
                <span className="font-mono text-[10px] text-white/30">MADE TO ORDER // PRINTFUL</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p className="font-mono text-sm text-white/40 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Size selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.size}
                      onClick={() => { setSelectedSize(variant.size); setError(null); }}
                      disabled={!variant.inStock}
                      className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-150
                        ${!variant.inStock
                          ? 'border border-white/10 text-white/20 cursor-not-allowed line-through'
                          : selectedSize === variant.size
                          ? 'bg-rgrm-red border border-rgrm-red text-white'
                          : 'border border-white/20 text-white hover:border-white'
                        }`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="font-mono text-[10px] text-rgrm-red tracking-widest border border-rgrm-red/30 px-4 py-3">
                ⚠ {error}
              </p>
            )}

            {/* CTA — visible on desktop inline */}
            <div className="hidden md:block pt-2">
              <button
                onClick={handleCheckout}
                disabled={loading || isSoldOut}
                className="group relative w-full px-8 py-5 bg-transparent border border-white text-white overflow-hidden transition-all duration-300 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 72%, 97% 100%, 0 100%)' }}
              >
                <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
                <span className="relative z-10 font-mono text-xs font-bold uppercase tracking-[0.3em]">
                  {loading ? 'CONNECTING...' : isSoldOut ? 'ARCHIVED' : 'INITIATE ACQUISITION'}
                </span>
              </button>
              <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest text-center mt-4">
                Secured via Stripe · Shipped via Printful
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE STICKY BUTTON — always visible at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#050505] border-t border-white/10 p-4">
        {error && (
          <p className="font-mono text-[10px] text-rgrm-red tracking-widest mb-3 text-center">
            ⚠ {error}
          </p>
        )}
        <button
          onClick={handleCheckout}
          disabled={loading || isSoldOut}
          className="group relative w-full px-8 py-4 bg-transparent border border-white text-white overflow-hidden transition-all duration-300 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
          <span className="relative z-10 font-mono text-xs font-bold uppercase tracking-[0.3em]">
            {loading ? 'CONNECTING...' : isSoldOut ? 'ARCHIVED' : 'INITIATE ACQUISITION'}
          </span>
        </button>
      </div>

    </main>
  );
}
