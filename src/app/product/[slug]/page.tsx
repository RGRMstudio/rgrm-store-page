import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { createCheckout } from "@/app/actions/stripe";
import ShareButton from "@/components/ShareButton";

// FORCE NEXT.JS TO LOOK UP NEW PRODUCTS IF THEY ARE NOT PRERENDERED
export const dynamicParams = true; 
export const revalidate = 60; // Revalidate data every minute

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-03-25",
  useCdn: false, // Set to false to ensure we get fresh data from Sanity
});

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch product data from Sanity using the slug
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`, 
    { slug }
  );

  // If Sanity returns nothing, show the Next.js 404 page
  if (!product) notFound();

  const handleCheckout = createCheckout.bind(null, 
    product.printfulId, 
    product.title, 
    product.price
  );

  return (
    <main className="max-w-6xl mx-auto p-8 pt-24 grid md:grid-cols-2 gap-16 min-h-screen items-center">
      {/* Product Image Section */}
      <div className="relative aspect-square bg-[#f5f5f5] rounded-none overflow-hidden border border-black/5">
        {product.image && (
          <Image
            src={urlFor(product.image).width(1000).url()}
            alt={product.title}
            fill
            className="object-contain p-8 mix-blend-multiply"
            priority
          />
        )}
      </div>

      {/* Product Information Section */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-[0.9]">
            {product.title}
          </h1>
          <p className="text-sm font-mono text-gray-400 uppercase tracking-widest">
            Artifact ID: {product.printfulId || "UNREGISTERED"}
          </p>
        </div>

        <div className="flex items-baseline gap-4">
          <p className="text-4xl font-light">${product.price}</p>
          <span className="text-[10px] font-mono border border-black px-2 py-1 uppercase">Tax Included</span>
        </div>
        
        <div className="prose text-gray-600 max-w-sm font-medium leading-relaxed">
          <p>{product.description || "Structural study in industrial design. Manufactured upon signal verification."}</p>
        </div>

        <form action={handleCheckout} className="pt-6">
          <button 
            type="submit" 
            className="w-full bg-black text-white py-6 font-bold uppercase tracking-[0.2em] hover:bg-red-700 transition-colors duration-300"
          >
            Initiate Order
          </button>
        </form>

        <div className="pt-4">
           <ShareButton title={product.title} />
        </div>
      </div>
    </main>
  );
}
