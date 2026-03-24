// Add these fields to your product document schema
export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product Name',
    },
    // ... your other fields (price, images, etc.)
    {
      name: 'variants',
      type: 'array',
      title: 'Product Variants',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Variant Name (e.g. Black / XL)' },
            { name: 'price', type: 'number', title: 'Price' },
            { 
              name: 'printful_variant_id', 
              type: 'string', 
              title: 'Printful Variant ID',
              description: 'Get this from your Printful dashboard or the test script.'
            },
            { name: 'sku', type: 'string', title: 'SKU' }
          ]
        }
      ]
    }
  ]
}
