import React from 'react';

/**
 * RaGuiRoMo Store: Bauhaus Geometric Grid Component
 * Designed for minimalism, clean lines, and dynamic user interaction.
 */

const ProductGrid = () => {
  // These categories represent the primary "chic" navigation blocks of your store
  const categories = [
    { 
      title: "Apparel", 
      color: "bg-[#0066FF]", // Bauhaus Blue
      size: "md:col-span-2 h-[450px]", 
      shape: "rounded-full" 
    }, 
    { 
      title: "Art", 
      color: "bg-[#FF0000]", // Bauhaus Red
      size: "h-[450px]", 
      shape: "rotate-45" 
    }, 
    { 
      title: "Object", 
      color: "bg-[#FFCC00]", // Bauhaus Yellow
      size: "md:col-span-3 h-[300px]", 
      shape: "w-full" 
    },
  ];

  return (
    <section className="bg-[#F9F7F2] p-6 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className={`group relative overflow-hidden border-4 border-black transition-all duration-500 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 cursor-pointer ${cat.color} ${cat.size}`}
          >
            {/* Minimalist Bauhaus Label */}
            <div className="absolute top-8 left-8 z-10">
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mix-blend-difference group-hover:scale-110 transition-transform duration-500">
                {cat.title}
              </h3>
            </div>

            {/* Interactive Decorative Shapes inspired by your Logo */}
            <div className={`absolute -bottom-12 -right-12 w-64 h-64 bg-black opacity-20 transition-all duration-700 group-hover:scale-150 group-hover:opacity-40 ${cat.shape}`} />
            
            {/* Dynamic "Chic" Call to Action */}
            <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
              <span className="bg-white text-black px-6 py-2 font-black uppercase tracking-widest border-2 border-black">
                Explore +
              </span>
            </div>
          </div>
        ))}

        {/* Dynamic Identity Statement Block */}
        <div className="md:col-span-3 border-8 border-black p-16 flex items-center justify-center bg-white hover:bg-[#F9F7F2] transition-colors duration-500">
          <p className="text-4xl md:text-6xl font-black uppercase text-center leading-[0.9] tracking-tighter italic">
            Modern <span className="text-[#0066FF]">Design</span> <br /> 
            Meets <span className="text-[#FF0000]">Pure</span> <br /> 
            <span className="text-[#FFCC00]">Identity</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
