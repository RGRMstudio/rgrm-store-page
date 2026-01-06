import { Instagram } from 'lucide-react';

export default function SocialGallery() {
  return (
    <section className="py-20 border-t border-gray-50 text-center">
      <Instagram className="mx-auto mb-6 w-5 h-5 stroke-[1px]" />
      <h2 className="text-[10px] uppercase tracking-[0.5em] mb-12">@RAGUIROMO.STUDIO</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-square bg-gray-100"></div>
        ))}
      </div>
    </section>
  );
}

