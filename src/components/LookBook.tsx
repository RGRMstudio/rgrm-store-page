// src/components/Lookbook.tsx
import React from 'react';

export default function Lookbook() {
  const lookbookItems = [
    { title: "Pure Identity", subtitle: "The Tee", color: "bg-[#0066FF]", text: "text-white" },
    { title: "Modern Design", subtitle: "The Print", color: "bg-[#FF0000]", text: "text-white" },
    { title: "Geometric Soul", subtitle: "The Object", color: "bg-[#FFCC00]", text: "text-black" },
  ];

  return (
    <section className="h-screen overflow-y-scroll snap-y snap-mandatory border-t-8 border-black">
      {lookbookItems.map((item, index) => (
        <div 
          key={index} 
          className={`h-screen w-full snap-start flex flex-col items-center justify-center p-12 relative ${item.color} ${item.text}`}
        >
          <div className="border-8 border-black p-8 md:p-16 flex flex-col items-center bg-white/10 backdrop-blur-sm">
            <span className="text-xl font-black uppercase tracking-[0.3em] mb-4">{item.subtitle}</span>
            <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-center leading-none">
              {item.title}
            </h2>
          </div>
          
          {/* Brand Signature Decoration */}
          <div className="absolute bottom-12 right-12">
            <p className="text-2xl font-black uppercase rotate-90 origin-bottom-right tracking-widest opacity-30">
              RaGuiRoMo Store // 2026
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
