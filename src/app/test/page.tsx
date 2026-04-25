import Footer from '@/components/Footer';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-4xl p-8">Test Page</h1>
      <p className="p-8">If you see the footer below, it works!</p>
      <Footer />
    </div>
  );
}
