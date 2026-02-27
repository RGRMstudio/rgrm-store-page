'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemaTypes'

/**
 * RGRM // STUDIO CONFIGURATION
 * This file bootstraps the Sanity Studio interface.
 */

// --- 1. CONFIGURATION CONSTANTS ---
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  // The base path where the studio will be accessible (e.g., rgrm.studio/studio)
  basePath: '/studio',
  
  name: 'RGRM_Registry',
  title: 'RGRM // Identity Registry',

  projectId,
  dataset,

  plugins: [
    // structureTool() creates the "Desk" view where you edit your documents
    structureTool(),
    // visionTool() allows you to test GROQ queries directly in the Studio
    visionTool(),
  ],

  schema: {
    // This pulls in the array of types (including your study.ts) from your index file
    types: schemaTypes,
  },

  theme: {
    /* Optional: Custom brutalist styling can be injected here */
  }
})
