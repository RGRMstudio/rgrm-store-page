import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { createCheckout } from "@/app/actions/stripe"; // We build this next!
import ShareButton from "@/components/ShareButton";

// 1. Setup Sanity Reader
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-03-25",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch product data from Sanity
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`, 
    { slug }
  );

  if (!product) notFound();

  // Create the "Buy Now" logic
  const handleCheckout = createCheckout.bind(null, 
    product.printfulId, 
    product.title, 
    product.price
  );

  return (
    <main className="max-w-6xl mx-auto p-8 pt-24 grid md:grid-cols-2 gap-16 min-h-screen items-center">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
        {product.image && (
          <Image
            src={urlFor(product.image).width(1000).url()}
            alt={product.title}
            fill
            className="object-contain p-4"
            priority
          />
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">
            {product.title}
          </h1>
          <p className="text-xl font-mono text-gray-400">STUDY No. {product.printfulId}</p>
        </div>

        <p className="text-3xl font-light">${product.price}</p>
        
        <div className="prose text-gray-500 max-w-sm">
          <p>{product.description || "A structural study in manifesto design. Printed on high-quality gallery paper."}</p>
        </div>

        <form action={handleCheckout} className="pt-4">
          <button type="submit" className="w-full bg-black text-white py-5 font-bold uppercase tracking-widest hover:bg-gray-900 transition-all">
            Initiate Order
          </button>
        </form>

        <ShareButton title={product.title} />
      </div>
    </main>
  );
}
