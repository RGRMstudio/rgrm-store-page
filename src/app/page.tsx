export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">RaGuiRoMo Studio</h1>
        <p className="text-gray-400 mb-8">Industrial Art Machine</p>
        <a href="/selection" className="inline-block border border-white px-6 py-3 hover:bg-white hover:text-black transition">
          VIEW COLLECTION
        </a>
      </div>
    </div>
  );
}
