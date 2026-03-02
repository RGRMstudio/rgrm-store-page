import { client, urlFor } from '@/lib/sanity';
import AddToCartButton from '@/components/product/AddToCartButton';
import { RGRM_IDENTITY } from '@/lib/constants';
import Link from 'next/link';

/**
 * RGRM // DOSSIER_VIEW
 * Single Product Architecture (Structural Study Details)
 */

async function getProduct(id: string) {
  const query = `*[_type == "study" && _id == "${id}"][0]`;
  const data = await client.fetch(query);
  return data;
}

export default async function StudyDossier({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-rgrm-red font-mono text-xs uppercase">
        Error: Dossier_Not_Found
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 flex flex-col lg:flex-row relative z-10 bg-black">
      {/* 1. VISUAL EVIDENCE PANEL */}
      <section className="w-full lg:w-1/2 px-6 lg:pl-12 lg:pr-6 mb-12 lg:mb-0">
        <div className="border border-white/10 bg-rgrm-gray aspect-square relative overflow-hidden group">
          <img 
            src={urlFor(product.image).url()} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 text-[10px] font-mono text-rgrm-red">
            REF_IMG_{product._id.substring(0, 6)}
          </div>
        </div>
      </section>

      {/* 2. TECHNICAL SPECIFICATIONS PANEL */}
      <section className="w-full lg:w-1/2 px-6 lg:pr-12 lg:pl-6 flex flex-col justify-center">
        <div className="max-w-md">
          <nav className="mb-8">
            <Link href="/selection" className="text-[10px] font-mono text-white/40 hover:text-rgrm-red transition-colors">
              [BACK_TO_ARCHIVE]
            </Link>
          </nav>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-none">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-10">
            <span className="text-2xl font-mono text-white">${product.price}</span>
            <span className="text-[10px] font-mono text-rgrm-red px-2 py-1 border border-rgrm-red/30 uppercase">
              Limited_Acquisition
            </span>
          </div>

          <div className="space-y-6 mb-12 text-xs text-white/50 font-mono leading-relaxed uppercase">
            <p>{product.description}</p>
            <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-6">
              <div>
                <span className="block text-white/20 mb-1">[CATEGORY]</span>
                <span className="text-white">{product.category || 'STRUCTURAL_STUDY'}</span>
              </div>
              <div>
                <span className="block text-white/20 mb-1">[STUDIO]</span>
                <span className="text-white">RGRM_MEX_002</span>
              </div>
            </div>
          </div>

          <AddToCartButton product={{
            id: product._id,
            name: product.name,
            price: product.price,
            image: urlFor(product.image).url()
          }} />
          
          <p className="mt-6 text-[9px] text-white/20 font-mono italic">
            * All acquisitions are logged into the Identity Registry. 
            Allow 7-14 cycles for manufacturing and dispatch.
          </p>
        </div>
      </section>
    </main>
  );
}
