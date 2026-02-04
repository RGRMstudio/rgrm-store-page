export default function RegistryPage() {
  return (
    <main className="min-h-screen bg-white p-8 font-sans">
      <h1 className="text-4xl font-bold uppercase mb-8 border-b-4 border-black pb-2">
        Authenticated Identity Registry
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="border-l-4 border-red-600 pl-4">
          <h2 className="text-xl font-bold uppercase mb-4 text-red-600">Phase 01: Brutalist Lineage</h2>
          <p className="text-gray-600 uppercase text-sm tracking-widest">
            Study 001: RGRM Hoodie
          </p>
          <p className="mt-4 text-black">
            Structural integrity: Verified. <br />
            Status: Available for acquisition.
          </p>
        </section>
        {/* Future phases will be added here */}
      </div>
    </main>
  );
}
