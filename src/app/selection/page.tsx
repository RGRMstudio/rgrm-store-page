import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { client, urlFor } from '@/lib/sanity';
import { RGRM_IDENTITY } from '@/lib/constants';
import AddToCartButton from '@/components/product/AddToCartButton';

// --- 1. CONFIGURATION ---
// Revalidate this page every 60 seconds to check for price/stock updates (ISR)
export const revalidate = 60;

// Define the shape of the data coming from Sanity
interface ProductData {
  id: string;
  name: string;
  price: number;
  status: 'AVAILABLE' | 'LOW STOCK' | 'SOLD OUT';
  image: any; // Sanity Image Object
  description: string;
  specs: string;
  material?: string;
  fit?: string;
  origin?: string;
}

// --- 2. GENERATE STATIC PARAMS (SSG) ---
// This tells Next.js to pre-build a page for every ID currently in Sanity
export async function generateStaticParams() {
  const query = `*[_type == "study"]{ "id": id }`;
  const products = await client.fetch(query);

  return products.map((product: { id: string }) => ({
    id: product.id,
  }));
}

// --- 3. DYNAMIC METADATA (SEO) ---
export async function generateMetadata({ params }: { params: { id: string } }) {
  const query = `*[_type == "study" && id == $id][0]{ name, description }`;
  const product = await client.fetch(query, { id: params.id });

  if (!product) return { title: 'FILE NOT FOUND' };

  return {
    title: `${product.name} // ${params.id}`,
    description: product.description,
  };
}

// --- 4. THE PAGE COMPONENT ---
export default async function ProductPage({ params }: { params: { id: string } }) {
  // Fetch full details
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

  // If ID doesn't exist in Sanity, trigger the 404 page
  if (!product) {
    notFound();
  }

  const isSoldOut = product.status === 'SOLD OUT';

  return (
    <main className="min-h-screen pt-24 pb-12 flex flex-col lg:flex-row relative z-10 bg-black">
      
      {/* --- COLUMN 1: VISUAL EVIDENCE (Sticky Image) --- */}
      <section className="w-full lg:w-1/2 px-6 lg:pl-12 lg:pr-6 mb-12 lg:mb-0">
        <div className="sticky top-32">
           
           {/* Image Container */}
           <div className="aspect-[3/4] w-full bg-neutral-900 relative border border-white/10 overflow-hidden group">
             
             {/* Sanity Image */}
             {product.image && (
               <Image 
                 src={urlFor(product.image).width(1200).height(1600).url()}
                 alt={product.name}
                 fill
                 className={`object-cover transition-all duration-700 ${isSoldOut ? 'grayscale opacity-50' : 'group-hover:scale-105'}`}
                 priority // Load this image immediately
               />
             )}
             
             {/* Fallback for missing image */}
             {!product.image && (
               <div className="absolute inset-0 flex items-center justify-center text-white/5 font-black text-6xl rotate-[-45deg] select-none">
                 NO_SIGNAL
               </div>
             )}
             
             {/* Status Badge */}
             <div className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-white/20 px-3 py-1">
               <span className={`text-xs font-bold tracking-widest uppercase ${isSoldOut ? 'text-neutral-500' : 'text-rgrm-red animate-pulse'}`}>
                 STATUS: {product.status}
               </span>
             </div>

             {/* Watermark ID */}
             <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/40 bg-black/50 px-2 py-1">
               REF: {product.id}
             </div>
           </div>

           {/* Breadcrumbs Navigation */}
           <div className="mt-6 flex gap-2 text-[10px] uppercase tracking-widest text-white/40 font-bold">
             <Link href="/" className="hover:text-white transition-colors">Index</Link> 
             <span>/</span>
             <Link href="/selection" className="hover:text-white transition-colors">Selection</Link>
             <span>/</span>
             <span className="text-white border-b border-rgrm-red pb-0.5">{product.id}</span>
           </div>
        </div>
      </section>

      {/* --- COLUMN 2: TECHNICAL DOSSIER (Scrollable Info) --- */}
      <section className="w-full lg:w-1/2 px-6 lg:pr-24 lg:pl-12 flex flex-col justify-center">
        
        <div className="space-y-8 max-w-xl">
          
          {/* Header Block */}
          <div className="border-b border-white/20 pb-8 space-y-4">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] font-[family-name:var(--font-headline)]">
              {product.name}
            </h1>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-light tracking-widest text-rgrm-red font-mono">
                ${product.price}.00 USD
              </p>
              <span className="text-[10px] uppercase tracking-widest text-white/30">
                Phase: 001
              </span>
            </div>
          </div>

          {/* Description Block */}
          <div className="prose prose-invert">
            <p className="text-sm md:text-base leading-loose text-white/80 font-[family-name:var(--font-body)] uppercase tracking-wide">
              {product.description || "Structural data corrupted. Description unavailable."}
            </p>
          </div>

          {/* Technical Specs Table */}
          <div className="grid grid-cols-1 gap-4 py-8 border-y border-white/10">
             <SpecRow label="Material" value={product.material || 'N/A'} />
             <SpecRow label="Fit Profile" value={product.fit || 'Standard'} />
             <SpecRow label="Origin" value={product.origin || 'Imported'} />
             <SpecRow label="Engineering" value={RGRM_IDENTITY.shortName + " Studio"} />
          </div>

          {/* ACTION MODULE (Client Component) */}
          <div className="pt-8 space-y-4">
            <AddToCartButton 
              disabled={isSoldOut}
              item={{
                id: product.id,
                name: product.name,
                price: product.price,
                // If image exists, pass the URL, otherwise empty string
                image: product.image ? urlFor(product.image).width(200).url() : '',
                quantity: 1
              }}
            />
            
            <div className="flex justify-between items-center text-[9px] text-white/30 uppercase tracking-widest">
              <span>Secure Transaction // Encrypted</span>
              <span>Global Logistics Available</span>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

// --- HELPER COMPONENT ---
function SpecRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center text-xs uppercase tracking-[0.15em] hover:bg-white/5 p-2 transition-colors -mx-2 rounded-sm">
      <span className="text-white/40 font-bold">{label}</span>
      <span className="text-white font-medium text-right">{value}</span>
    </div>
  );
}
