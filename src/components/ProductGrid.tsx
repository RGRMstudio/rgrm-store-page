'use client';

import React from 'react';

const products = [
  { id: 1, name: "Bauhaus Tee No. 1", price: "45.00", category: "Apparel" },
  { id: 2, name: "Manifesto Poster", price: "30.00", category: "Print" },
  { id: 3, name: "Geometric Study", price: "120.00", category: "Digital" },
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border-t border-black bg-black">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-8 aspect-square flex flex-col justify-between group cursor-pointer hover:bg-[#e63946] hover:text-white transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-bold tracking-tighter">
              {product.category}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-tighter">
              In Stock: &quot;Ready&quot;
            </span>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-4xl font-black uppercase leading-none mb-2">
              {product.name}
            </h3>
            <p className="text-sm font-medium">
              Designed for the world&apos;s most rigorous creators.
            </p>
          </div>
          
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black">${product.price}</span>
            <span className="text-[10px] font-bold border-b-2 border-current uppercase">
              View Details
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
