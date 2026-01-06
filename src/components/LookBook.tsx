'use client';

import Image from 'next/image';

interface LookbookItem {
  id: string;
  title: string;
  description: string;
  imagePath: string;
}

const LOOKBOOK_DATA: LookbookItem[] = [
  {
    id: '01',
    title: 'Pure Structure',
    description: 'An exploration of linear form and spatial balance.',
    imagePath: '/lookbook-1.jpg', // Ensure these images exist in your /public folder
  },
  {
    id: '02',
    title: 'The Registry',
    description: 'Digital artifacts archived in perpetuity.',
    imagePath: '/lookbook-2.jpg',
  },
  {
    id: '03',
    title: 'Bauhaus Essence',
    description: 'Form following function in its most distilled state.',
    imagePath: '/lookbook-3.jpg',
  }
];

export default function LookBook() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-4">
            Visual Archive
          </h2>
          <p className="text-xl font-light italic text-black">Lookbook 2026</p>
        </header>

        <div className="space-y-32">
          {LOOKBOOK_DATA.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex flex-col md:flex-row items-center gap-12 ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image Container */}
              <div className="w-full md:w-3/5 aspect-[4/5] relative bg-gray-50 border border-gray-100 overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-300 group-hover:opacity-0 transition-opacity">
                  Artifact {item.id}
                </div>
                {/* When you have your real images, use the Image component:
                  <Image src={item.imagePath} alt={item.title} fill className="object-cover" />
                */}
              </div>

              {/* Text Container */}
              <div className="w-full md:w-2/5 text-center md:text-left">
                <span className="text-[10px] text-[#D4AF37] tracking-[0.3em] uppercase mb-4 block">
                  Series {item.id}
                </span>
                <h3 className="text-2xl font-light mb-6 tracking-tight">{item.title}</h3>
                <p className="text-xs leading-relaxed text-gray-500 font-light max-w-sm mx-auto md:mx-0">
                  {item.description}
                </p>
                <div className="mt-8 h-[1px] w-12 bg-black mx-auto md:mx-0"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
