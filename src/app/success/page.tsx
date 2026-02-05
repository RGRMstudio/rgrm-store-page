export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 font-mono">
      <div className="border-4 border-black p-10 relative">
        <div className="absolute top-0 right-0 w-12 h-12 bg-[#BC2026]"></div>
        <h1 className="text-2xl font-bold uppercase border-b-2 border-black pb-2 mb-4">Acquisition Successful</h1>
        <p>Registry updated. Study 001 has been assigned to your profile.</p>
        <p className="mt-6 text-xs text-gray-400">RGRM STUDIO // FORM FOLLOWS FUNCTION</p>
      </div>
    </main>
  );
}
