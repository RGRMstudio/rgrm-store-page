import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { client, urlFor } from '@/lib/sanity';
import { RGRM_IDENTITY } from '@/lib/constants';
import AddToCartButton from '@/components/product/AddToCartButton';

// --- CONFIGURATION ---
// Incremental Static Regeneration: Re-check Sanity for data updates every 60 seconds.
export const revalidate = 60;

interface ProductData {
  id: string;
  name: string;
  price: number;
  status: 'AVAILABLE' | 'LOW STOCK' | 'SOLD OUT';
  image: any; 
  description: string;
  specs: string;
  material?: string;
  fit?: string;
  origin?: string;
}

// --- 1. STATIC PATH GENERATION ---
// Pre-builds pages for all Study IDs found in the CMS.
export async function generateStaticParams() {
  const query = `*[_type == "study"]{ "id": id }`;
  const products = await client.fetch(query);

  return products.map((product: { id: string }) => ({
    id: product.id,
  }));
}

// --- 2. DYNAMIC METADATA ---
export async function generateMetadata({ params }: { params: { id: string } }) {
  const query = `*[_type == "study" && id == $id][0]{ name, specs }`;
  const product = await client.fetch(query, { id: params.id });

  if (!product) return { title: '404 // NULL_REFERENCE' };

  return {
    title: `${product.name} // ${params.id}`,
    description: product.specs,
  };
}

// --- 3. THE PAGE COMPONENT ---
export default async function ProductPage({ params }: { params: { id: string } }) {
  const query = `
    *[_type == "study" && id == $id][0] {
      id,
      name,
      price,
      status,
      "image": mainImage,
      description,
      specs,
      material,
      fit,
      origin
    }
  `;
  
  const product: ProductData = await client.fetch(query, { id: params.id });

  if (!product) {
    notFound();
  }

  const isSoldOut = product.status === 'SOLD OUT';

  return (
    <main className="min-h-screen pt-24 pb-12 flex flex-col lg:flex-row relative z-10 bg-black">
      
      {/* --- VISUAL EVIDENCE PANEL --- */}
      <section className="w-full lg:w-1/2 px-6 lg:pl-12 lg:pr-6 mb-12 lg:mb-0">
        <div className="sticky top-32">
           <div className="aspect-[3/4] w-full bg-neutral-900 relative border border-white/10 overflow-hidden">
             
             {product.image ? (
               <Image 
                 src={urlFor(product.image).width(1200).url()}
                 alt={product.name}
                 fill
                 className={`object-cover transition-all duration-700 ${isSoldOut ? 'grayscale opacity-40' : 'hover:scale-105'}`}
                 priority
               />
             ) : (
               <div className="absolute inset-0 flex items-center justify-center text-white/5 font-black text-6xl rotate-[-45deg]">
                 NO_SIGNAL
               </div>
             )}
             
             {/* Status Badge */}
             <div className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-white/20 px-3 py-1">
               <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isSoldOut ? 'text-neutral-500' : 'text-rgrm-red animate-pulse'}`}>
                 {product.status}
               </span>
             </div>

             {/* Identifier Watermark */}
             <div className="absolute bottom-4 right-4 text-[9px] font-mono text-white/30 uppercase">
               Ref: {product.id}
             </div>
           </div>

           {/* Breadcrumbs */}
           <nav className="mt-6 flex gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold font-mono">
             <Link href="/selection" className="hover:text-white transition-colors underline decoration-rgrm-red/50 underline-offset-4">Selection</Link> 
             <span>/</span>
             <span className="text-white">{product.id}</span>
           </nav>
        </div>
      </section>

      {/* --- TECHNICAL DOSSIER PANEL --- */}
      <section className="w-full lg:w-1/2 px-6 lg:pr-24 lg:pl-12 flex flex-col justify-center">
        <div className="space-y-10 max-w-xl">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-10">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] font-[family-name:var(--font-headline)]">
              {product.name}
            </h1>
            <div className="mt-6 flex justify-between items-baseline">
              <p className="text-3xl font-light tracking-widest text-rgrm-red font-mono">
                ${product.price}.00
              </p>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Identity Registry 002
              </span>
            </div>
          </div>

          {/* Analysis */}
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold italic">Tactical Analysis //</h2>
            <p className="text-sm md:text-base leading-relaxed text-white/80 font-[family-name:var(--font-body)] uppercase tracking-wide">
              {product.description}
            </p>
          </div>

          {/* Specifications Table */}
          <div className="border-y border-white/10 divide-y divide-white/5">
             <SpecItem label="Technical Specs" value={product.specs} />
             <SpecItem label="Composition" value={product.material || 'DATA_REDACTED'} />
             <SpecItem label="Silhouette" value={product.fit || 'STANDARD_ISSUE'} />
             <SpecItem label="Origin" value={product.origin || 'SECTOR_UNKNOWN'} />
          </div>

          {/* Acquisition Module */}
          <div className="pt-6">
            <AddToCartButton 
              disabled={isSoldOut}
              item={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image ? urlFor(product.image).width(200).url() : '',
                quantity: 1
              }}
            />
            <p className="mt-4 text-[8px] text-center uppercase tracking-[0.5em] text-white/20">
              Secure Encrypted Transaction // {RGRM_IDENTITY.shortName} Protocol
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}

// Internal Helper for the Specs Table
function SpecItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center py-4 text-[10px] uppercase tracking-[0.2em]">
      <span className="text-white/30 font-bold">{label}</span>
      <span className="text-white font-mono text-right">{value}</span>
    </div>
  );
}
