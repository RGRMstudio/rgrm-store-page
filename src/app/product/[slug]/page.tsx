import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { createCheckout } from "@/app/actions/stripe";
import ShareButton from "@/components/ShareButton";

export const dynamicParams = true;
export const revalidate = 60;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-03-25",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug }
  );

  if (!product) notFound();

  const handleCheckout = createCheckout.bind(
    null,
    product.printfulId,
    product.title,
    product.price
  );

  return (
    <main className="min-h-screen bg-[#050505] text-rgrm-light pt-24">

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
          <Link href="/" className="hover:text-white/50 transition-colors">RGRM</Link>
          {" // "}
          <Link href="/selection" className="hover:text-white/50 transition-colors">Selection</Link>
          {" // "}
          <span className="text-white/40">{product.title}</span>
        </p>
      </div>

      {/* PRODUCT LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-0 border-t border-white/5 mt-4">

        {/* LEFT — IMAGE */}
        <div className="relative aspect-square bg-rgrm-gray border-r border-white/5 overflow-hidden">
          {product.image ? (
            <Image
              src={urlFor(product.image).width(1200).url()}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-black text-white/10 text-5xl">NO_IMG</span>
            </div>
          )}

          {/* Artifact tag */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-white/30 tracking-widest uppercase">
            ARTIFACT // {product.printfulId || "UNREGISTERED"}
          </div>
        </div>

        {/* RIGHT — DOSSIER */}
        <div className="flex flex-col justify-between p-10 md:p-14 min-h-[600px]">

          {/* TOP — Title block */}
          <div>
            <p className="font-mono text-[10px] text-rgrm-red tracking-[0.3em] uppercase mb-4">
              Structural Study
            </p>
            <h1 className="font-sans font-black text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.9] tracking-[-0.04em] mb-6">
              {product.title}
            </h1>

            {/* Spec lines */}
            <div className="border-t border-white/5 pt-6 space-y-3 mb-8">
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Price</span>
                <span className="font-mono text-lg text-rgrm-light">
                  ${product.price}{" "}
                  <span className="text-xs text-white/30">USD</span>
                </span>
              </div>
              <div className="flex justify-between items-baseline border-t border-white/5 pt-3">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Status</span>
                <span className="flex items-center gap-2 font-mono text-xs text-rgrm-red">
                  <span className="w-1.5 h-1.5 rounded-full bg-rgrm-red animate-pulse" />
                  Available
                </span>
              </div>
              <div className="flex justify-between items-baseline border-t border-white/5 pt-3">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Fulfillment</span>
                <span className="font-mono text-xs text-white/40">Print-on-Demand // RGRM Studio</span>
              </div>
            </div>

            {/* Description */}
            <p className="font-mono text-sm text-white/40 leading-relaxed max-w-sm">
              {product.description ||
                "Structural study in industrial design. Manufactured upon signal verification. Each acquisition is produced to order."}
            </p>
          </div>

          {/* BOTTOM — CTA block */}
          <div className="pt-10 space-y-4">
            <form action={handleCheckout}>
              <button
                type="submit"
                className="w-full bg-rgrm-red text-white py-5 font-mono font-bold uppercase tracking-[0.25em] text-sm hover:bg-white hover:text-rgrm-black transition-colors duration-300"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 72%, 96% 100%, 0 100%)",
                }}
              >
                Initiate Acquisition
              </button>
            </form>

            <div className="flex items-center justify-between pt-2">
              <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
                Secured via Stripe
              </p>
              <ShareButton title={product.title} />
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
