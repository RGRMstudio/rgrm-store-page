const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function getDetailedVariants() {
  const key = process.env.PRINTFUL_API_KEY;
  try {
    // 1. Get all products
    const productsRes = await axios.get('https://api.printful.com/store/products', {
      headers: { 'Authorization': `Bearer ${key}` }
    });

    for (const product of productsRes.data.result) {
      console.log(`\n📦 PRODUCT: ${product.name} (ID: ${product.id})`);
      
      // 2. Get specific variants (Size/Color) for each product
      const variantRes = await axios.get(`https://api.printful.com/store/products/${product.id}`, {
        headers: { 'Authorization': `Bearer ${key}` }
      });

      variantRes.data.result.sync_variants.forEach(v => {
        console.log(`   - ${v.name} | VARIANT ID: ${v.variant_id} | SKU: ${v.external_id}`);
      });
    }
  } catch (err) {
    console.error("❌ Error fetching variants:", err.message);
  }
}

getDetailedVariants();
