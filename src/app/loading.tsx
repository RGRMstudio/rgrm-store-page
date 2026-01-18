export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
      <div className="relative w-24 h-24">
        {/* Animated Bauhaus Shapes */}
        <div className="absolute inset-0 bg-red-600 animate-ping opacity-75" />
        <div className="absolute inset-0 border-8 border-black flex items-center justify-center bg-yellow-400">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-bounce" />
        </div>
      </div>
      <p className="font-black uppercase tracking-[0.3em] text-xl">
        Authenticating <span className="text-red-600">RGRM</span> Registry...
      </p>
    </div>
  );
}
