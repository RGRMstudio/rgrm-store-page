import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center">
      <h1 className="text-3xl font-serif mb-4 text-[#D4AF37]">Identity Verified</h1>
      <p className="text-gray-400 mb-8 max-w-sm">
        Your bespoke Identity Certificate is being generated. Please check your email inbox shortly.
      </p>
      <Link href="/" className="border border-[#D4AF37] px-8 py-2 text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all">
        Return to Store
      </Link>
    </div>
  );
}
