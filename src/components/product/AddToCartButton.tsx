'use client';

import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // 1. Create cart item object matching CartItem type
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      thumbnail: product.thumbnail, // ✅ Use 'thumbnail' not 'image'
      variantId: product.variants?.[0]?.printfulVariantId,
      size: product.variants?.[0]?.size,
    };

    // 2. Add to cart
    addToCart(cartItem);

    // 3. Optional: Show feedback to user
    alert('Added to cart!');
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-white text-black px-8 py-4 uppercase font-bold hover:bg-gray-200 transition-colors"
    >
      Add to Cart
    </button>
  );
}
