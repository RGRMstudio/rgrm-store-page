// src/app/page.tsx
"use client";

import { useState } from 'react';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';

// Define the Product type to match the Sanity schema expected by ProductGrid
// Based on the error: 'thumbnail' is required and is a string, 'slug' is { current: string }
type Product = {
  _id: string;
  name: string;
  slug: { current: string }; // Sanity-style slug object
  thumbnail: string; // Required string URL for the image
  price: number;
  // Add other fields if ProductGrid expects them, e.g., description?: string;
};

// Optional: Add basic error boundary if needed later
export const dynamic = 'force-dynamic';

export default function HomePage() {
  // Example product data matching the *Sanity-derived* Product type expected by ProductGrid
  // Including the required 'thumbnail' property as a string
  const exampleProducts: Product[] = [
    {
      _id: 'prod_face_tshirt',
      name: 'FACE SERIES T-SHIRT',
      slug: { current: 'face-series-t-shirt' }, // Note: slug is an object { current: ... }
      thumbnail: '/images/face-tshirt.jpg', // Note: thumbnail is a required string URL
      price: 35.00, // Price as a number
    },
    {
      _id: 'prod_logos_hoodie',
      name: 'LOGOS HOODIE',
      slug: { current: 'logos-hoodie' }, // Note: slug is an object { current: ... }
      thumbnail: '/images/logos-hoodie.jpg', // Note: thumbnail is a required string URL
      price: 85.00,
    },
    {
      _id: 'prod_decay_jacket',
      name: 'DECAY JACKET',
      slug: { current: 'decay-jacket' }, // Note: slug is an object { current: ... }
      thumbnail: '/images/decay-jacket.jpg', // Note: thumbnail is a required string URL
      price: 145.00,
    },
    {
      _id: 'prod_koi_dress',
      name: 'KOI DRESS',
      slug: { current: 'koi-dress' }, // Note: slug is an object { current: ... }
      thumbnail: '/images/koi-dress.jpg', // Note: thumbnail is a required string URL
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
        {/* Pass the correctly typed flat array directly to ProductGrid - NOW INCLUDES THUMBNAIL */}
        <ProductGrid products={exampleProducts} />
      </section>
    </main>
  );
}
