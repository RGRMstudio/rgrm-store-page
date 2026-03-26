export default {
  name: 'product',
  type: 'document',
  title: 'Products',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Product Name',
      description: 'The name of your structural study or poster.',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'The web address (e.g., raguiromo.store/product/manifesto-poster).',
    },
    {
      name: 'printfulId',
      type: 'number',
      title: 'Printful Product ID',
      readOnly: true,
      description: 'This is linked automatically. Do not change.',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Retail Price (USD)',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Main Product Image',
      options: {
        hotspot: true, // Allows you to crop the image perfectly in the CMS
      },
    },
    {
      name: 'description',
      type: 'text',
      title: 'Product Description',
      rows: 4,
    },
  ],
};
