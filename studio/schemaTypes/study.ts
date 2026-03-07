/**
 * RGRM // SCHEMA: STRUCTURAL STUDY
 */

export default {
  name: 'study',
  title: 'Structural Study',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Study ID',
      type: 'string',
      description: 'Tactical identifier (e.g., STUDY-001).',
      validation: (Rule: any) => Rule.required().uppercase(),
    },
    {
      name: 'name',
      title: 'Designation',
      type: 'string',
      description: 'The engineering name of the module.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Acquisition Cost (USD)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      type: 'string',
      description: 'Starts with price_...',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Visual Evidence (Primary)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Tactical Analysis',
      type: 'text',
      rows: 5,
    },
    {
      name: 'status',
      title: 'Operational Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'AVAILABLE' },
          { title: 'Archived', value: 'SOLD OUT' },
        ],
        layout: 'radio',
      },
      initialValue: 'AVAILABLE',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'id', media: 'mainImage' },
    prepare({ title, subtitle, media }: any) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle ? `REF: ${subtitle}` : 'ID_PENDING',
        media,
      }
    },
  },
}
