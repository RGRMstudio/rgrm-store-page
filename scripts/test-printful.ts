/**
 * RGRMstore - Printful Store 002 Connection Verifier
 * This script bypasses Stripe to test if your Printful API Key 
 * and Store ID (17181557) are correctly configured.
 */

const STORE_ID = '17181557'; // RaGuiRoMo Store 002
const API_KEY = process.env.PRINTFUL_STORE_A002_KEY;

async function verifyRGRMConnection() {
  console.log('--- 🧪 STARTING RGRMSTORE CONNECTION TEST ---');

  if (!API_KEY) {
    console.error('❌ ERROR: PRINTFUL_STORE_A002_KEY is missing from your environment variables.');
    return;
  }

  try {
    const response = await fetch('https://api.printful.com/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'X-PF-Store-Id': STORE_ID,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient: {
          name: 'RGRM Test Recipient',
          address1: '123 Identity Way',
          city: 'New York',
          state_code: 'NY',
          country_code: 'US',
          zip: '10001',
        },
        items: [
          {
            sync_variant_id: 0, // Placeholder for test
            quantity: 1,
            name: 'RGRM Registry Test Item',
            retail_price: '0.00',
          },
        ],
        draft: true, // This ensures NO actual charge or production happens
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ SUCCESS: RGRMstore is linked to Printful Store 002!');
      console.log(`🔗 Order Created (DRAFT): https://www.printful.com/dashboard/default/orders/view/${data.result.id}`);
    } else {
      console.error('❌ CONNECTION FAILED:', data.error.message);
    }
  } catch (error: any) {
    console.error('❌ NETWORK ERROR:', error.message);
  }

  console.log('--- 🧪 TEST COMPLETE ---');
}

verifyRGRMConnection();
