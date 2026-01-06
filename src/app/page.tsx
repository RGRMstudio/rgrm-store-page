import { createCheckoutSession } from './actions/checkout';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">
        The Identity <span className="text-[#D4AF37]">Registry</span>
      </h1>
      <p className="text-gray-400 text-sm max-w-lg mx-auto mb-12 leading-relaxed">
        Secure your bespoke digital certificate. Authenticated, archived, and delivered to your doorstep.
      </p>

      {/* Primary Action: Stripe Checkout */}
      <form action={createCheckoutSession} className="mb-20">
        <button type="submit" className="btn-gold">
          Acquire Certificate
        </button>
      </form>

      {/* Secondary Action: Registry/Newsletter */}
      <div className="border-t border-gray-900 pt-20">
        <h2 className="text-xs uppercase tracking-[0.3em] mb-8 text-gray-500">Join the Archive</h2>
        <form className="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="EMAIL ADDRESS" 
            className="bg-transparent border-b border-gray-800 p-2 text-xs focus:border-[#D4AF37] outline-none"
            required
          />
          <button className="text-[10px] uppercase tracking-widest hover:text-[#D4AF37] transition-colors">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
