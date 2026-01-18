export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8">
      {/* Bauhaus Geometric Loader */}
      <div className="relative w-32 h-32 border-8 border-black flex items-center justify-center bg-yellow-400">
        <div className="w-16 h-16 bg-red-600 animate-pulse border-4 border-black" />
        <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-600 rounded-full border-4 border-black animate-bounce" />
      </div>
      <div className="text-center">
        <p className="font-black uppercase tracking-[0.5em] text-2xl">
          RGRM <span className="text-red-600">Loading</span>
        </p>
        <p className="text-xs font-bold uppercase mt-2 opacity-50">Syncing with Printful Store 002</p>
      </div>
    </div>
  );
}
