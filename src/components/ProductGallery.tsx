'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const galleryImages = images.length > 0 ? images : [];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  if (galleryImages.length === 0) {
    return (
      <div className="relative aspect-[3/4] w-full bg-darkGray flex items-center justify-center">
        <p className="text-gray-600 text-sm uppercase tracking-widest">No Images Available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main Image */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-darkGray cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={galleryImages[selectedImage]}
              alt={`${productName} - View ${selectedImage + 1}`}
              fill
              className="object-cover"
              priority={selectedImage === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-blood-red text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-blood-red text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {galleryImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 text-xs text-white font-mono">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip (Desktop) */}
      {galleryImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 hidden md:grid">
          {galleryImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden bg-darkGray transition-all duration-300 ${
                selectedImage === index 
                  ? 'ring-2 ring-blood-red ring-offset-2 ring-offset-black' 
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dots Navigation (Mobile) */}
      {galleryImages.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                selectedImage === index ? 'bg-blood-red w-6' : 'bg-gray-700 w-1.5'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
