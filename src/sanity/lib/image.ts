import { imageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { createClient } from 'next-sanity';

import { dataset, projectId } from '../env';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.source(source);
}

export function sanityImage(url: string) {
  return urlFor(url).width(800).auto('format').url();
}
