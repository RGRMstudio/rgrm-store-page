// src/app/page.tsx
import Image from 'next/image';

const STUDIES = [
  {
    id: 'RGRM-001-B',
    name: 'Study 001: Brutalist Tee',
    price: '$45',
    image: '/tee-black.jpg', // Ensure this image is in your /public folder
    description: 'Phase 01: Structural Integrity Study'
  }
];

export default function Home() {
  return (
    <main className="bg-[#000000] text-[#FFFFFF] min-h-screen p-8">
      {/* Montserrat Bold Headline */}
      <h1 className="text-4xl font-bold mb-12 tracking-tighter">
        RGRM STUDIO: PHASE 01
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {STUDIES.map((study) => (
          <div key={study.id} className="border border-[#FFFFFF] p-4 flex flex-col gap-4">
            <div className="bg-[#FFFFFF] aspect-square relative">
               {/* Image would go here */}
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-50 uppercase">{study.id}</p>
                <h2 className="text-xl font-bold uppercase">{study.name}</h2>
              </div>
              <p className="text-lg">{study.price}</p>
            </div>
            
            {/* The Acquisition Button */}
            <button className="bg-[#BC2026] text-white py-3 font-bold uppercase hover:bg-red-700 transition-colors">
              Acquire Study
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
