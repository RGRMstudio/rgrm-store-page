// Helper function to create orders in Printful

export async function createPrintfulOrder({
  customer,
  items,
  externalId,
}: {
  customer: {
    name: string;
    email: string;
    phone?: string;
    address: {
      line1: string;
      city: string;
      state?: string;
      postalCode: string;
      country: string;
    };
  };
  items: Array<{
    syncVariantId: string; // Your synced Printful variant ID
    quantity: number;
    retailPrice?: number; // Your selling price (for packing slip)
  }>;
  externalId: string; // Link to your internal order ID (e.g., Stripe session ID)
}) {
  const API_KEY = process.env.PRINTFUL_API_KEY;
  const STORE_ID = process.env.PRINTFUL_STORE_ID;

  if (!API_KEY || !STORE_ID) {
    throw new Error('Missing Printful API credentials');
  }

  const orderPayload = {
    recipient: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      address1: customer.address.line1,
      city: customer.address.city,
      state_code: customer.address.state || '',
      country_code: customer.address.country,
      zip: customer.address.postalCode,
    },
    items: items.map((item) => ({
      sync_variant_id: item.syncVariantId,
      quantity: item.quantity,
      ...(item.retailPrice && { retail_price: item.retailPrice.toFixed(2) }),
    })),
    external_id: externalId, // Link Stripe session to Printful order
    // Set to true to auto-charge and fulfill, or false to review first
    confirm_order: true,
  };

  const response = await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-PF-Store-ID': STORE_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderPayload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Printful API error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  console.log(`✅ Printful order created: ${result.result.id}`);
  return result;
}
