const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function test() {
  try {
    console.log('Testing Sanity connection...');
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
    
    const products = await client.fetch('*[_type == "product"]{ _id, name, slug }');
    
    if (products.length === 0) {
      console.log('⚠️  No products found in Sanity!');
    } else {
      console.log(`✅ Found ${products.length} products:`);
      products.forEach(p => console.log(`  - ${p.name} (${p.slug?.current || p._id})`));
    }
  } catch (error) {
    console.error('❌ Error fetching from Sanity:', error.message);
  }
}

test();
