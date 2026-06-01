export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#BC2026]">
            Legal / Privacy
          </p>
          <h1 className="mb-6 text-5xl font-black uppercase md:text-7xl">
            Privacy<br />Policy
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-gray-400 leading-relaxed mb-10 text-xl font-light">
            At RaGuiRoMo, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information when you visit our digital exhibition and acquire our artifacts.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">1. Information We Collect</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            To fulfill your orders and improve your experience, we may collect the following types of information:
          </p>
          <ul className="text-gray-400 space-y-2 list-disc list-inside pl-4">
            <li><strong>Personal Information:</strong> Name, email address, shipping and billing address, and phone number.</li>
            <li><strong>Payment Information:</strong> Credit card details and transaction history (processed securely via Stripe).</li>
            <li><strong>Usage Data:</strong> Browser type, device information, and pages visited to help us optimize the site.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">2. How We Use Your Information</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Your data is used strictly for:
          </p>
          <ul className="text-gray-400 space-y-2 list-disc list-inside pl-4">
            <li>Processing and shipping your orders.</li>
            <li>Communicating with you about your account or order status.</li>
            <li>Improving our website functionality and product offerings.</li>
            <li>Compliance with legal obligations.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">3. Data Sharing</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            We do not sell, trade, or rent your personal identification information. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            We use third-party services (Stripe for payments, Printful for fulfillment) that may collect and process your data as part of the transaction process.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">4. Cookies</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            We use cookies to enhance your experience. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. If you turn cookies off, some features of the site may not function properly.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">5. Your Rights</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            You have the right to access, correct, or delete your personal data at any time. To exercise these rights, please contact us directly.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 uppercase tracking-wide">6. Contact Us</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
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
