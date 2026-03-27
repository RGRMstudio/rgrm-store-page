import Link from "next/link";
import SuccessAnimation from "@/components/SuccessAnimation";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id } = await searchParams;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <SuccessAnimation />

      <div className="space-y-6 max-w-sm">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Order Confirmed</h1>
        <p className="text-gray-500 font-mono text-xs uppercase">
          ID: {session_id?.slice(-12)}
        </p>
        <p className="text-lg">
          Your structural study is entering production. Watch your email for updates from Loops.
        </p>
        
        <div className="pt-8">
          <Link href="/" className="border-b-2 border-black pb-1 hover:text-gray-400 transition-all uppercase font-bold text-sm">
            Back to Studio
          </Link>
        </div>
      </div>
    </main>
  );
}
