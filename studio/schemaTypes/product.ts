// schemas/product.js
export default {
name: ‘product’,
title: ‘Product’,
type: ‘document’,
fields: [
{
name: ‘title’,
title: ‘Title’,
type: ‘string’,
validation: Rule => Rule.required()
},
{
name: ‘slug’,
title: ‘Slug’,
type: ‘slug’,
options: { source: ‘title’ },
validation: Rule => Rule.required()
},
{
name: ‘description’,
title: ‘Description’,
type: ‘text’
},
{
name: ‘category’,
title: ‘Category’,
type: ‘string’,
options: {
list: [
{ title: ‘Apparel’, value: ‘apparel’ },
{ title: ‘Print’, value: ‘print’ },
{ title: ‘Digital’, value: ‘digital’ },
{ title: ‘Accessory’, value: ‘accessory’ }
]
}
},
{
name: ‘images’,
title: ‘Images’,
type: ‘array’,
of: [{ type: ‘image’, options: { hotspot: true } }]
},
{
name: ‘printfulProductId’,
title: ‘Printful Product ID’,
type: ‘number’,
description: ‘Auto-synced from Printful’
},
{
name: ‘printfulSyncProductId’,
title: ‘Printful Sync Product ID’,
type: ‘number’,
description: ‘Used for order fulfillment’
},
{
name: ‘variants’,
title: ‘Variants’,
type: ‘array’,
of: [
{
type: ‘object’,
name: ‘variant’,
fields: [
{ name: ‘printfulVariantId’, title: ‘Printful Variant ID’, type: ‘number’ },
{ name: ‘printfulSyncVariantId’, title: ‘Printful Sync Variant ID’, type: ‘number’ },
{ name: ‘size’, title: ‘Size’, type: ‘string’ },
{ name: ‘color’, title: ‘Color’, type: ‘string’ },
{ name: ‘colorHex’, title: ‘Color Hex’, type: ‘string’ },
{ name: ‘price’, title: ‘Price (USD)’, type: ‘number’ },
{ name: ‘stripePriceId’, title: ‘Stripe Price ID’, type: ‘string’ },
{ name: ‘inStock’, title: ‘In Stock’, type: ‘boolean’, initialValue: true },
{ name: ‘sku’, title: ‘SKU’, type: ‘string’ }
],
preview: {
select: { size: ‘size’, color: ‘color’, price: ‘price’ },
prepare({ size, color, price }) {
return { title: `${size} / ${color}`, subtitle: `$${price}` }
}
}
}
]
},
{
name: ‘basePrice’,
title: ‘Base Price (USD)’,
type: ‘number’,
description: ‘Lowest variant price, auto-calculated’
},
{
name: ‘isActive’,
title: ‘Active / Visible’,
type: ‘boolean’,
initialValue: true
},
{
name: ‘lastSyncedAt’,
title: ‘Last Synced At’,
type: ‘datetime’,
description: ‘Auto-updated on Printful sync’
}
],
preview: {
select: { title: ‘title’, media: ‘images.0’, price: ‘basePrice’, active: ‘isActive’ },
prepare({ title, media, price, active }) {
return {
title,
subtitle: `$${price ?? '—'} ${active ? '✅' : '⏸ Hidden'}`,
media
}
}
}
}
