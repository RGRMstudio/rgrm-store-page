export default function LookBook() {
  const images = [1, 2, 3, 4]; // Placeholders for your product shots

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((id) => (
          <div key={id} className="aspect-[3/4] bg-gray-50 flex items-center justify-center border border-gray-100 hover:border-black transition-colors overflow-hidden">
             <span className="text-[10px] uppercase tracking-widest text-gray-300">Artifact 00{id}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
