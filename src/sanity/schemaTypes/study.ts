/**
 * RGRM // SCHEMA: STRUCTURAL STUDY
 * Documentation for Identity Registry Module 002.
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
      description: 'The tactical identifier for this unit (e.g., STUDY-001).',
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
      description: 'The URL path segment for this study.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Operational Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'AVAILABLE' },
          { title: 'Low Stock', value: 'LOW STOCK' },
          { title: 'Archived (Sold Out)', value: 'SOLD OUT' },
        ],
        layout: 'radio',
      },
      initialValue: 'AVAILABLE',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Acquisition Cost (USD)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'mainImage',
      title: 'Visual Evidence (Primary)',
      type: 'image',
      options: {
        hotspot: true, // Allows precision cropping for thumbnails
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'specs',
      title: 'Technical Specifications (Summary)',
      type: 'string',
      description: 'Key technical attributes (e.g., NYLON / WATER-RESISTANT).',
    },
    {
      name: 'description',
      title: 'Tactical Analysis (Full)',
      type: 'text',
      description: 'Detailed narrative of the study’s engineering and purpose.',
      rows: 5,
    },
    
    // --- METADATA SECTOR ---
    {
      name: 'material',
      title: 'Material Composition',
      type: 'string',
      description: 'Technical breakdown of the textiles used.',
    },
    {
      name: 'fit',
      title: 'Fit Profile',
      type: 'string',
      description: 'The intended silhouette (e.g., Oversized, Tapered).',
    },
    {
      name: 'origin',
      title: 'Manufacturing Origin',
      type: 'string',
      description: 'The sector/region of production.',
    },
    {
      name: 'printfulId',
      title: 'Printful Variant ID',
      type: 'string',
      description: 'Reference for fulfillment Store 002: 17181557.',
    },
  ],

  // CMS PREVIEW CONFIGURATION
  preview: {
    select: {
      title: 'name',
      subtitle: 'id',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }: any) {
      return {
        title: title || 'Untitled Study',
        subtitle: subtitle ? `REF: ${subtitle}` : 'ID_PENDING',
        media,
      };
    },
  },
};
