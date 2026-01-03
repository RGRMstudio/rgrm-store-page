// src/components/SocialGallery.tsx
import { motion } from 'framer-motion';

export default function SocialGallery() {
  const images = [
    { id: 1, color: 'bg-[#0066FF]', label: 'IDENTITY' },
    { id: 2, color: 'bg-[#FF0000]', label: 'DESIGN' },
    { id: 3, color: 'bg-[#FFCC00]', label: 'BAUHAUS' },
    { id: 4, color: 'bg-black', label: 'RGRM' },
  ];

  return (
    <section className="bg-white py-20 border-t-4 border-black overflow-hidden">
      <div className="mb-12 px-8">
        <h2 className="text-5xl font-black uppercase tracking-tighter">
          Seen on <span className="text-[#0066FF]">Social</span>
        </h2>
      </div>

      {/* Infinite Scroll Row */}
      <motion.div 
        className="flex gap-8 px-8"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...images, ...images].map((item, index) => (
          <div 
            key={index} 
            className={`${item.color} min-w-[300px] h-[400px] border-4 border-black flex items-center justify-center relative group`}
          >
            <span className="text-white font-black text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
              {item.label}
            </span>
            <div className="absolute inset-4 border-2 border-white opacity-20" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
