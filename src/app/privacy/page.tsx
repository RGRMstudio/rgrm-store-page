export default function Privacy() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black mb-8">Privacy Policy</h1>
      <p className="text-gray-400 leading-relaxed mb-4">
        RaGuiRoMo respects your privacy. We collect only necessary order & shipping data.
        No third-party sharing. Contact studio@raguiromo.store for data requests.
      </p>
      <p className="text-gray-500 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
    </main>
  );
}
