export default {
  name: 'settings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      name: 'studioName',
      type: 'string',
      title: 'Studio Name',
      initialValue: 'RGRM STUDIO',
    },
    {
      name: 'instagramUrl',
      type: 'url',
      title: 'Instagram Link',
    },
    {
      name: 'twitterUrl',
      type: 'url',
      title: 'Twitter/X Link',
    },
    {
      name: 'contactEmail',
      type: 'string',
      title: 'Support Email',
    },
  ],
};
