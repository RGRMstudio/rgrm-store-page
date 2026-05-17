import createImageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

import { dataset, projectId } from '../env';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export function sanityImage(url: string) {
  return urlFor(url).width(800).auto('format').url();
}
