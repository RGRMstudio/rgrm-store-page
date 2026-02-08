'use client';

/**
 * RGRM STUDIO: THE GALLERY
 * Phase: 01 (Brutalist Lineage)
 */

const STUDIES = [
  {
    id: 'RGRM-001-B',
    name: 'Study 001: Brutalist Tee',
    price: '$45',
    description: 'Phase 01: Architectural Cotton Study. Studio Black.'
  }
];

export default function Home() {
  const handleAcquisition = async (studyId: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artifactId: studyId, size: 'M' }), // Testing with M
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error('Studio Error:', err);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen p-12 font-[Montserrat]">
      <header className="mb-20">
        <h1 className="text-6xl font-bold tracking-tighter">RGRM STUDIO</h1>
        <p className="text-[#BC2026] tracking-widest mt-2 uppercase font-bold">Phase 01: Brutalist Lineage</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {STUDIES.map((study) => (
          <div key={study.id} className="border border-white/20 p-8 flex flex-col gap-6">
            <div className="bg-[#111] aspect-square flex items-center justify-center text-4xl opacity-10 font-bold">RGRM</div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[#BC2026] text-xs font-bold uppercase">{study.id}</p>
                <h2 className="text-2xl font-bold uppercase">{study.name}</h2>
                <p className="text-sm opacity-50 mt-1">{study.description}</p>
              </div>
              <p className="text-xl font-bold">{study.price}</p>
            </div>
            <button 
              onClick={() => handleAcquisition(study.id)}
              className="bg-white text-black py-4 font-bold uppercase hover:bg-[#BC2026] hover:text-white transition-all"
            >
              Acquire Study
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
