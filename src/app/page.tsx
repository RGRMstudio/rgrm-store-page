// src/app/page.tsx
"use client";

import { useState } from 'react';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';

// Define the Product type to match the Sanity schema expected by ProductGrid
type SanitySlug = {
  current: string;
};

type SanityImageAsset = {
  _ref: string;
  _type: string;
  assetId: string;
  url: string;
};

type SanityImage = {
  _type: string;
  asset: SanityImageAsset;
};

type Product = {
  _id: string;
  name: string;
  slug: SanitySlug; // This is the key difference - slug is an object with 'current'
  mainImage?: SanityImage; // Optional, assuming ProductGrid handles missing images
  price: number; // Assuming price is stored as a number
  // Add other fields if ProductGrid expects them, e.g., description?: string;
};

// Optional: Add basic error boundary if needed later
export const dynamic = 'force-dynamic';

export default function HomePage() {
  // Example product data matching the *Sanity-derived* Product type expected by ProductGrid
  const exampleProducts: Product[] = [
    {
      _id: 'prod_face_tshirt',
      name: 'FACE SERIES T-SHIRT',
      slug: { current: 'face-series-t-shirt' }, // Note: slug is now an object
      // mainImage: { _type: 'image', asset: { _ref: '...', _type: 'reference', assetId: '...', url: '/path...' }}, // Optional
      price: 35.00, // Price as a number
    },
    {
      _id: 'prod_logos_hoodie',
      name: 'LOGOS HOODIE',
      slug: { current: 'logos-hoodie' }, // Note: slug is now an object
      // mainImage: { _type: 'image', asset: { _ref: '...', _type: 'reference', assetId: '...', url: '/path...' }}, // Optional
      price: 85.00,
    },
    {
      _id: 'prod_decay_jacket',
      name: 'DECAY JACKET',
      slug: { current: 'decay-jacket' }, // Note: slug is now an object
      // mainImage: { _type: 'image', asset: { _ref: '...', _type: 'reference', assetId: '...', url: '/path...' }}, // Optional
      price: 145.00,
    },
    {
      _id: 'prod_koi_dress',
      name: 'KOI DRESS',
      slug: { current: 'koi-dress' }, // Note: slug is now an object
      // mainImage: { _type: 'image', asset: { _ref: '...', _type: 'reference', assetId: '...', url: '/path...' }}, // Optional
      price: 120.00,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <div className="brutalist-noise" aria-hidden="true" />
      <Hero />
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl mb-20 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#BC2026]">Phase 01</p>
          <h2 className="text-4xl font-black uppercase md:text-6xl">Structural<br />Artifacts</h2>
        </div>
        {/* Pass the correctly typed flat array directly to ProductGrid */}
        <ProductGrid products={exampleProducts} />
      </section>
    </main>
  );
}
