import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

export default function ProductGrid({ products }: { products: Product[] }) {
  // --- THE GUARD CLAUSE ---
  // This prevents build errors if the product array is undefined or empty.
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <p className="text-zinc-500 font-mono">SIGNAL LOST: SYNCING ARCHIVE...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {products.map((product) => (
        <Link 
          key={product.id} 
          href={`/product/${product.id}`}
          className="group block bg-black border border-zinc-800 hover:border-yellow-400 transition-all duration-300"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
            />
          </div>
          <div className="p-4 flex justify-between items-center font-mono">
            <h3 className="text-white text-sm uppercase tracking-widest">{product.name}</h3>
            <p className="text-yellow-400 text-sm">{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
