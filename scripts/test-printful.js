const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function checkPrintful() {
  const key = process.env.PRINTFUL_API_KEY;
  if (!key) {
    console.error("❌ Error: PRINTFUL_API_KEY is missing from .env.local");
    return;
  }

  try {
    const response = await axios.get('https://api.printful.com/store/products', {
      headers: { 'Authorization': `Bearer ${key}` }
    });
    console.log(`✅ Connection Successful!`);
    console.log(`📦 Found ${response.data.result.length} products in Printful Store 17181557.`);
    response.data.result.forEach(p => console.log(` - ${p.name} (ID: ${p.id})`));
  } catch (err) {
    console.error("❌ Connection Failed:", err.response?.data?.error?.message || err.message);
  }
}

checkPrintful();
