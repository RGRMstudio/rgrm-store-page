import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client' // Use your existing client config

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source).auto('format').fit('max')
}
