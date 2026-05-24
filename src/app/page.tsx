import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Featured Collection Section */}
      <section className="bg-black px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gray-500">
              The Collection
            </p>
            <h2 className="text-5xl font-black md:text-7xl">
              STRUCTURAL<br />ARTIFACTS
            </h2>
          </div>
          
          {/* Product Grid will load products from Sanity */}
          <ProductGrid />
        </div>
      </section>

      {/* Manifesto Teaser */}
      <section className="bg-charcoal px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-8 text-sm uppercase tracking-[0.3em] text-blood-red">
            The Philosophy
          </p>
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            TRUTH TO<br />MATERIALS
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-12">
            We strip away digital gloss to reveal raw, physical presence. 
            Every piece is an artifact from the RGRM Studio—built for the modern grid, 
            inspired by the theatrical drama of high fashion and the uncompromising 
            integrity of brutalist architecture.
          </p>
          <a 
            href="/manifesto"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] border-b border-white pb-1 hover:border-blood-red transition-colors"
          >
            Read the Manifesto
            <span className="text-blood-red">→</span>
          </a>
        </div>
      </section>
    </>
  );
}
