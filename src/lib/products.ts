// lib/products.ts
// RGRM PRODUCT CATALOG
// This is your single source of truth.
// Each product maps its Stripe Price ID to its Printful Variant IDs by size.

export interface PrintfulVariant {
  size: string;
  variantId: string;
  inStock: boolean;
}

export interface RGRMProduct {
  id: string;               // Internal RGRM ID (e.g. RGRM_STUDY_001)
  name: string;             // Display name
  description: string;      // Short description
  price: number;            // Price in USD (must match Stripe)
  stripePriceId: string;    // From Stripe dashboard → product → price ID
  image: string;            // Image URL (from Canva/public folder)
  status: 'AVAILABLE' | 'LOW STOCK' | 'SOLD OUT';
  category: string;         // e.g. 'HOODIE', 'TEE'
  variants: PrintfulVariant[];
}

export const RGRM_PRODUCTS: RGRMProduct[] = [
  {
    id: 'RGRM_STUDY_001',
    name: 'Study 001: Brutalist Lineage',
    description: 'All-Over Print Recycled Unisex Hoodie. Phase 01 of the RGRM identity series.',
    price: 65,
    stripePriceId: 'price_1SzoioDVc7z8RC9IwwYzowLH', // ← your existing Stripe price ID
    image: '/images/rgrm-study-001.jpg',              // ← update with your actual image path
    status: 'AVAILABLE',
    category: 'HOODIE',
    variants: [
      { size: '2XS', variantId: '69ae86fb786dc4', inStock: true },
      { size: 'XS',  variantId: '69ae86fb786e29', inStock: true },
      { size: 'S',   variantId: '69ae86fb786e77', inStock: true },
      { size: 'M',   variantId: '69ae86fb786ec2', inStock: true },
      { size: 'L',   variantId: '69ae86fb786f19', inStock: true },
      // ADD XL, 2XL, 3XL, 4XL, 5XL, 6XL below
      // Get their IDs from Printful the same way
      { size: 'XL',  variantId: 'PASTE_XL_ID_HERE',  inStock: true },
      { size: '2XL', variantId: 'PASTE_2XL_ID_HERE', inStock: true },
      { size: '3XL', variantId: 'PASTE_3XL_ID_HERE', inStock: true },
    ],
  },
  {
    id: 'RGRM_HOODIE_001',
    name: 'RGRM Hoodie',
    description: 'Classic RGRM structured hoodie.',
    price: 65,
    stripePriceId: 'PASTE_STRIPE_PRICE_ID_FOR_RGRM_HOODIE', // ← get from Stripe dashboard
    image: '/images/rgrm-hoodie.jpg',
    status: 'AVAILABLE',
    category: 'HOODIE',
    variants: [
      // Paste your Printful variant IDs here once you have them
      { size: 'S', variantId: 'PASTE_VARIANT_ID', inStock: true },
      { size: 'M', variantId: 'PASTE_VARIANT_ID', inStock: true },
      { size: 'L', variantId: 'PASTE_VARIANT_ID', inStock: true },
    ],
  },
];

// Helper: find product by ID
export function getProductById(id: string): RGRMProduct | undefined {
  return RGRM_PRODUCTS.find((p) => p.id === id);
}

// Helper: find product by Stripe Price ID
export function getProductByPriceId(priceId: string): RGRMProduct | undefined {
  return RGRM_PRODUCTS.find((p) => p.stripePriceId === priceId);
}
