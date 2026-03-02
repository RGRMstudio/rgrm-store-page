/**
 * RGRM // TRANSACTION_AUDIT_PROTOCOL
 * Verifies that Cart data maps correctly to Stripe Line Items.
 */

const mockCart = [
  { id: 'study_001', name: 'STRUCTURAL STUDY TEE', price: 45, quantity: 2 },
];

function verifyPayload(items: typeof mockCart) {
  console.log("--- STARTING TRANSACTION AUDIT ---");
  
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        metadata: { id: item.id } // CRITICAL: Printful needs this
      },
      unit_amount: item.price * 100, // Convert to cents
    },
    quantity: item.quantity,
  }));

  console.log("PAYLOAD_GENERATED:", JSON.stringify(lineItems, null, 2));

  // Validation Logic
  const totalCents = lineItems.reduce((acc, curr) => acc + (curr.price_data.unit_amount * curr.quantity), 0);
  
  if (totalCents === 9000) {
    console.log("✅ CALCULATION_VALID: Total matches expected $90.00");
  } else {
    console.log("❌ CALCULATION_ERROR: Mismatch in unit conversion.");
  }

  if (lineItems.every(item => item.price_data.product_data.metadata.id)) {
    console.log("✅ METADATA_VALID: All items contain ID pointers.");
  } else {
    console.log("❌ METADATA_ERROR: Missing ID pointers for fulfillment.");
  }
}

verifyPayload(mockCart);
