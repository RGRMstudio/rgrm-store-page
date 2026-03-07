import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure' // Updated name
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'RGRM // REGISTRY',

  projectId: '055j6pls', 
  dataset: 'production',

  plugins: [structureTool()], // Updated name

  schema: {
    types: schemaTypes,
  },
})
