export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#BC2026]">
            Legal / Returns
          </p>
          <h1 className="mb-6 text-5xl font-black uppercase md:text-7xl">
            Returns &<br />Refunds
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            Read before purchasing
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-gray-400 leading-relaxed mb-10 text-xl font-light">
            We want you to be completely satisfied with your RaGuiRoMo acquisition. Please review our return policy below.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">1. Return Window</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            You have <span className="text-white font-bold">30 days</span> from the date of delivery to request a return. To be eligible for a return, your item must be unused and in the same condition that you received it.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">2. Non-Returnable Items</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Certain items are exempt from being returned:
          </p>
          <ul className="text-gray-400 space-y-2 list-disc list-inside pl-4">
            <li>Items that have been worn, washed, or altered.</li>
            <li>Items missing original tags or packaging.</li>
            <li>Items showing signs of wear or damage caused by the customer.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">3. Refunds</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Once we receive your returned item and inspect it, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within <span className="text-white font-bold">5–7 business days</span>.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            <strong>Note:</strong> Shipping costs are non-refundable.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">4. Exchanges</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at studio@raguiromo.store.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">5. How to Initiate a Return</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            To start a return, please email us at <span className="text-[#BC2026] font-bold">studio@raguiromo.store</span>. Please include your order number and the reason for the return. We will provide you with the return address.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">6. Contact Us</h2>
          <div className="border-l-2 border-[#BC2026] pl-6 py-4 my-8">
            <p className="text-white font-mono text-lg">studio@raguiromo.store</p>
            <p className="text-gray-500 text-sm mt-1">RaGuiRoMo Studio</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-24 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-gray-600 uppercase tracking-widest">
            Form Follows Function
          </p>
        </div>
      </div>
    </main>
  );
}
