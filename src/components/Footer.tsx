import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-black tracking-tighter mb-4">RGRM</h3>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Phase 01: Brutalist Lineage. Wearable architecture where Bauhaus geometry meets monolithic mass. Designed in the RGRM Studio. Built for the modern grid.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">Navigate</h4>
            <ul className="space-y-3">
              <li><Link href="/selection" className="text-sm text-gray-400 hover:text-white transition-colors">Collection</Link></li>
              <li><Link href="/manifesto" className="text-sm text-gray-400 hover:text-white transition-colors">Manifesto</Link></li>
              <li><Link href="/studio" className="text-sm text-gray-400 hover:text-white transition-colors">Studio</Link></li>
              <li><Link href="/oracle" className="text-sm text-gray-400 hover:text-white transition-colors">Oracle</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="/shipping" className="text-sm text-gray-400 hover:text-white transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-sm text-gray-400 hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} RaGuiRoMo Studio. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Form Follows Function.
          </p>
        </div>
      </div>
    </footer>
  );
}
