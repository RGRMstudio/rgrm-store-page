export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-blood-red">
            Legal
          </p>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            TERMS OF<br />SERVICE
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">1. Agreement to Terms</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              By accessing and using the RaGuiRoMo website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">2. Products & Services</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              All products are made to order and fulfilled through our print-on-demand partners. We reserve the right to refuse service to anyone for any reason at any time.
            </p>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Product colors may vary slightly from images shown</li>
              <li>All measurements are approximate and may vary by up to 2 inches</li>
              <li>We reserve the right to limit quantities and discontinue any product</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">3. Orders & Payment</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              By placing an order, you represent that all information provided is accurate and complete. We reserve the right to refuse or cancel any order for any reason including but not limited to: product availability, errors in pricing, or suspected fraud.
            </p>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>All payments are processed securely through Stripe</li>
              <li>You agree to provide current, complete, and accurate purchase information</li>
              <li>You agree to promptly update your account and payment information</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">4. Shipping & Delivery</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Shipping times are estimates and not guaranteed. We are not responsible for delays caused by customs, weather, or carrier issues.
            </p>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Standard shipping: 5-7 business days</li>
              <li>Expedited shipping: 2-3 business days</li>
              <li>International shipping: 10-14 business days</li>
              <li>Free shipping on orders over $100</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">5. Returns & Refunds</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Due to the made-to-order nature of our products, we accept returns within 30 days of delivery for items that are unworn, unwashed, and with original tags attached.
            </p>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Items must be in original condition with tags attached</li>
              <li>Customer is responsible for return shipping costs</li>
              <li>Refunds processed within 5-7 business days of receipt</li>
              <li>Custom or personalized items cannot be returned</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">6. Intellectual Property</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              All content on this site, including designs, text, graphics, and logos, is the property of RaGuiRoMo and protected by copyright laws. You may not reproduce, distribute, or create derivative works without express written permission.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">7. Limitation of Liability</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              RaGuiRoMo shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service, unauthorized access to your data, or any other matter relating to the service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">8. Governing Law</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which RaGuiRoMo operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">9. Changes to Terms</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We reserve the right to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. By continuing to access or use our service, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">10. Contact Information</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="text-gray-400">
              <p>Email: studio@raguiromo.store</p>
              <p>Address: RGRM Studio</p>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <p className="text-xs text-gray-600 uppercase tracking-widest">
            Form Follows Function
          </p>
        </div>
      </div>
    </main>
  );
}
