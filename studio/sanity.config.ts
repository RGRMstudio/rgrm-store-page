import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'RGRM Registry',

  projectId: '055j6pls',
  dataset: 'production',

  plugins: [
    structureTool(), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
