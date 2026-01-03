import React from 'react';
import Image from 'next/image';

/**
 * RaGuiRoMo Store: Bauhaus Product Grid
 * Features: Asymmetrical layout, thick borders, and high-contrast primary colors.
 */

const ProductGrid = () => {
  // Mock data - This will eventually be replaced by your Printful API fetch
  const products = [
    { id: 1, name: "Geometric Tee", price: "$35", color: "bg-bauhaus-blue" },
    { id: 2, name: "Abstract Print", price: "$25", color: "bg-bauhaus-red" },
    { id: 3, name: "Identity Hoodie", price: "$65", color: "bg-bauhaus-yellow" },
  ];

  return (
    <section className="border-t-4 border-black">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
        
        {/* Large Featured "Chic" Tile */}
        <div className="md:col-span-2 h-[500px] bg-bauhaus-blue p-10 flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-black group cursor-pointer overflow-hidden relative">
          <div className="z-10">
            <span className="bg-black text-white px-3 py-1 text-sm font-black uppercase">Featured</span>
            <h3 className="text-7xl font-black text-white uppercase leading-none mt-4 tracking-tighter">
              New <br /> Drop
            </h3>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-bauhaus-yellow rounded-full transition-transform duration-700 group-hover:scale-150" />
          <button className="z-10 w-fit bg-black text-white px-8 py-3 font-black uppercase hover:bg-white hover:text-black transition-colors">
            Shop Collection
          </button>
        </div>

        {/* Dynamic Product Column */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="h-[250px] p-6 border-b-4 border-black sm:border-r-4 last:border-r-0 flex flex-col justify-between group cursor-pointer hover:bg-black transition-colors duration-300"
            >
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-full border-4 border-black ${product.color} group-hover:rounded-none transition-all duration-500`} />
                <span className="font-black text-2xl group-hover:text-white">{product.price}</span>
              </div>
              <div>
                <h4 className="font-black uppercase text-xl group-hover:text-white leading-tight">
                  {product.name}
                </h4>
                <p className="text-sm font-bold uppercase group-hover:text-bauhaus-yellow">View Details →</p>
              </div>
            </div>
          ))}

          {/* Minimalist "Identity" Block */}
          <div className="h-[250px] bg-bauhaus-yellow p-6 border-b-4 border-black flex items-center justify-center text-center">
             <p className="text-sm font-black uppercase tracking-widest leading-relaxed">
               Inspired by <br /> Bauhaus <br /> & Identity
             </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductGrid;

