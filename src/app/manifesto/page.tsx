'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function ManifestoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  const sections = [
    {
      title: "THE ROOT",
      subtitle: "Geometric Harmony",
      content: "RaGuiRoMo begins at the Bauhaus root. We celebrate the foundational geometry of the circle, the square, and the triangle—the essential building blocks of the modern grid. Following the ethos of 'Form Follows Function,' we utilize primary colors to create a visual language that is both timeless and functionally rigid. Every abstract composition is a tribute to the architects of the modernist movement.",
      image: "https://images.unsplash.com/photo-1508193637792-a980e5166990?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "THE EVOLUTION",
      subtitle: "Architectural Mass",
      content: "As we move into Phase 01: Brutalist Lineage, the grid undergoes a structural evolution. We embrace the uncompromising, monolithic weight of Brutalist architecture. The primary shapes are now anchored by heavy black arches, functioning as concrete monuments that frame our modernist vision. We follow the philosophy of 'Truth to Materials,' utilizing raw, tactile textures to give our digital presence a physical, structural mass. This is not just graphic design. It is wearable architecture.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "THE THEATER",
      subtitle: "The Masters",
      content: "The RGRM Studio is fueled by the theatrical drama of the masters. We draw inspiration from the hyper-structured, architectural silhouettes of Thierry Mugler and the raw, emotional storytelling of Alexander McQueen. We take the bold, uninhibited graphic statements of high fashion and ground them in the high-energy, rebellious spirit of modern streetwear. This synthesis creates a unique voice—where the theme is Modernist Architecture meets Abstract Chaos.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
    },
    {
      title: "THE LINEAGE",
      subtitle: "Structural vs. Rebellious",
      content: "Within this lineage, two distinct paths emerge. The Structural Core: a celebration of rigid integrity, focusing on monolithic arches and clean, monumental typography. The Rebellious Distortion: a maximalist deviation where we break our own rules. Here, the grid is subverted by high-energy collage, psychedelic textures, and the fun, loud attitude of the modern street. Both paths honor the same root—just expressed through different architectural languages.",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1974&auto=format&fit=crop"
    },
    {
      title: "THE STUDIO",
      subtitle: "Creativity × Code",
      content: "RaGuiRoMo is a dream come true—a launchpad where creativity and code collide. As a solo-operated studio, we have engineered a custom, headless architecture to ensure that every garment is a direct artifact of our personal design journey. From the first geometric sketch to the final automated stitch, this is an unapologetic pursuit of structural excellence. Designed in the RGRM Studio. Built for the modern grid.",
      image: "https://images.unsplash.com/photo-1550751863-88478f6a9665?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </motion.div>

        <motion.div 
          style={{ y }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 text-xs uppercase tracking-[0.3em] text-blood-red"
          >
            Phase 01
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.85]"
          >
            BRUTALIST<br />LINEAGE<br />MANIFESTO
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-gray-400 font-light leading-relaxed"
          >
            Wearable architecture. Where Bauhaus geometry meets monolithic mass.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="h-20 w-px bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Manifesto Sections */}
      {sections.map((section, index) => (
        <ManifestoSection 
          key={index}
          section={section}
          index={index}
          isReversed={index % 2 === 1}
        />
      ))}

      {/* Final CTA Section */}
      <section className="bg-charcoal px-6 py-32 text-center">
        <div className="mx-auto max-w-3xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-sm uppercase tracking-[0.3em] text-blood-red"
          >
            Join the Lineage
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-8"
          >
            ACQUIRE YOUR<br />ARTIFACT
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 mb-12 leading-relaxed"
          >
            Every piece is a direct artifact from the RGRM Studio—crafted with intention, built for the modern grid, and designed to become part of your personal architecture.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              href="/selection"
              className="group relative inline-flex items-center gap-4 overflow-hidden px-10 py-5 text-sm uppercase tracking-[0.3em] border border-white/30 hover:border-blood-red transition-all"
            >
              <span className="absolute inset-0 h-full w-0 bg-white transition-all duration-300 group-hover:w-full" />
              <span className="relative group-hover:text-black transition-colors">
                Explore the Collection
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="bg-black border-t border-white/10 px-6 py-12 text-center">
        <p className="text-xs text-gray-600 uppercase tracking-widest">
          Form Follows Function
        </p>
        <p className="text-xs text-gray-700 mt-2">
          © {new Date().getFullYear()} RaGuiRoMo Studio
        </p>
      </footer>
    </main>
  );
}

// Sub-component for each manifesto section
function ManifestoSection({ section, index, isReversed }: { 
  section: any; 
  index: number; 
  isReversed: boolean;
}) {
  return (
    <section className={`px-6 py-24 md:py-32 ${index % 2 === 0 ? 'bg-black' : 'bg-charcoal'}`}>
      <div className={`mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden bg-darkGray"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${section.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Section Label */}
          <div className="absolute bottom-6 left-6">
            <p className="text-xs uppercase tracking-[0.3em] text-blood-red mb-1">
              {section.subtitle}
            </p>
            <h3 className="text-3xl md:text-4xl font-black text-white">
              {section.title}
            </h3>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pl-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 hidden lg:block">
            0{index + 1}
          </p>
          
          <h3 className="text-3xl md:text-4xl font-black mb-6 lg:hidden">
            {section.title}
          </h3>
          
          <p className="text-lg text-gray-400 leading-relaxed font-light">
            {section.content}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
