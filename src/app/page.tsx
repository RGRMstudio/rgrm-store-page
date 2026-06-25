// src/app/page.tsx
"use client";

import { useState } from 'react';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';

// Define the Product type to match what ProductGrid expects
type Product = {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string; // URL string for the image
  price: number; // Assuming price is stored as a number (in cents or dollars)
};

// Optional: Add basic error boundary if needed later
export const dynamic = 'force-dynamic';

export default function HomePage() {
  // Example product data matching the ProductGrid's expected type
  // This is now a flat array, not grouped by spectrum
  const exampleProducts: Product[] = [
    {
      _id: 'prod_face_tshirt',
      name: 'FACE SERIES T-SHIRT',
      slug: 'face-series-t-shirt',
      thumbnail: '/path/to/t-shirt-image.jpg', // Replace with actual image path or URL from Sanity
      price: 35.00, // Price as a number
    },
    {
      _id: 'prod_logos_hoodie',
      name: 'LOGOS HOODIE',
      slug: 'logos-hoodie',
      thumbnail: '/path/to/hoodie-image.jpg', // Replace with actual image path or URL from Sanity
      price: 85.00,
    },
    {
      _id: 'prod_decay_jacket',
      name: 'DECAY JACKET',
      slug: 'decay-jacket',
      thumbnail: '/path/to/jacket-image.jpg', // Replace with actual image path or URL from Sanity
      price: 145.00,
    },
    {
      _id: 'prod_koi_dress',
      name: 'KOI DRESS',
      slug: 'koi-dress',
      thumbnail: '/path/to/dress-image.jpg', // Replace with actual image path or URL from Sanity
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
        {/* Pass the flat array directly to ProductGrid */}
        <ProductGrid products={exampleProducts} />
      </section>
    </main>
  );
}
