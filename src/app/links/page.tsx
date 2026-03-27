import { createClient } from "next-sanity";
import Link from "next/link";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-03-25",
  useCdn: true,
});

export default async function LinksPage() {
  const products = await client.fetch(`*[_type == "product"] | order(_createdAt desc)[0...4]`);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center p-8 pt-20 text-black">
      <div className="w-full max-w-sm space-y-4 text-center">
        <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6" />
        <h1 className="text-lg font-black tracking-widest uppercase">RGRM STUDIO</h1>
        
        <div className="space-y-3 pt-6">
          {products.map((product: any) => (
            <Link 
              key={product._id}
              href={`/product/${product.slug.current}`}
              className="block w-full border-2 border-black py-4 px-6 font-bold hover:bg-black hover:text-white transition-all uppercase text-xs tracking-widest"
            >
              Study: {product.title}
            </Link>
          ))}
          
          <Link href="/" className="block w-full bg-gray-100 py-4 px-6 font-bold hover:bg-black hover:text-white transition-all uppercase text-xs tracking-widest">
            Main Website
          </Link>
        </div>
      </div>
    </main>
  );
}
