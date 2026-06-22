import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <ProductGrid products={[]} />
    </main>
  );
}
