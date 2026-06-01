export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#BC2026]">
            Legal / Shipping
          </p>
          <h1 className="mb-6 text-5xl font-black uppercase md:text-7xl">
            Shipping<br />Policy
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            Effective immediately
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-gray-400 leading-relaxed mb-10 text-xl font-light">
            We ensure your artifact is crafted with precision and delivered with care. Our production and shipping processes are designed for efficiency and quality.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">1. Production & Fulfillment</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Each RaGuiRoMo piece is made-to-order. This eliminates waste and ensures quality control.
          </p>
          <ul className="text-gray-400 space-y-2 list-disc list-inside pl-4">
            <li><strong>Production Time:</strong> 2–5 business days.</li>
            <li><strong>Fulfillment Partners:</strong> We partner with Printful to print and ship globally.</li>
            <li><strong>Tracking:</strong> Once your order ships, you will receive a confirmation email with a tracking number.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">2. Shipping Rates & Delivery Times</h2>
          <div className="overflow-x-auto mt-8 mb-8">
            <table className="w-full text-left border-collapse border-b border-white/20">
              <thead>
                <tr>
                  <th className="py-4 text-white uppercase tracking-widest text-sm">Region</th>
                  <th className="py-4 text-white uppercase tracking-widest text-sm">Standard Shipping</th>
                  <th className="py-4 text-white uppercase tracking-widest text-sm">Expedited (Optional)</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-white/10">
                  <td className="py-4">United States</td>
                  <td className="py-4">5–7 Business Days</td>
                  <td className="py-4">2–3 Business Days</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4">Europe</td>
                  <td className="py-4">4–6 Business Days</td>
                  <td className="py-4">2–4 Business Days</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4">Canada</td>
                  <td className="py-4">5–8 Business Days</td>
                  <td className="py-4">3–5 Business Days</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4">Rest of World</td>
                  <td className="py-4">10–14 Business Days</td>
                  <td className="py-4">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">3. Free Shipping</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            We offer <span className="text-white font-bold">free standard shipping</span> on all orders over <span className="text-[#BC2026] font-bold">$100 USD</span>.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">4. International Customs & Duties</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            For orders shipped outside the United States, you may be responsible for paying import duties, taxes, and customs fees imposed by your country. These fees are not included in your order total or shipping cost. RaGuiRoMo is not responsible for these charges.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">5. Lost or Damaged Packages</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Once the package leaves our facility, RaGuiRoMo is not responsible for lost or damaged shipments. However, we will work with our carrier partners to help you file a claim if necessary.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">6. Contact Us</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Questions about your shipment?
          </p>
          <div className="border-l-2 border-[#BC2026] pl-6 py-4 my-8">
            <p className="text-white font-mono text-lg">studio@raguiromo.store</p>
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
