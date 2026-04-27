import { type SchemaTypeDefinition } from 'sanity'
import { product } from './schemaTypes/product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product],
}
