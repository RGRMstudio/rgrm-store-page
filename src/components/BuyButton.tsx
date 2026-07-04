// src/components/BuyButton.tsx
'use client';

export default function BuyButton({ 
  productId, 
  variantId, // This is the crucial prop we need to verify
  price, 
  name, 
  thumbnail, 
  size 
}: { 
  productId: string; 
  variantId: string; // Comes from currentVariant.printfulVariantId
  price: number; 
  name: string; 
  thumbnail: string;
  size: string;
}) {
  const handleBuyNow = async () => {
    // 👈 ADDED: Debug alert to confirm variantId
    alert(`DEBUG: Attempting checkout with variantId: ${variantId}`);
    // 👆 REMOVE this alert after confirming it's correct

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          variantId, // ✅ This is what the API route expects
          price,
          name,
          thumbnail,
          size,
        }),
      });

      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error: ' + (data.error || 'Could not create checkout session'));
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      className="bg-[#BC2026] hover:bg-red-700 text-white px-8 py-4 uppercase font-bold cursor-pointer transition-colors w-full md:w-auto"
    >
      Buy Now
    </button>
  );
}
