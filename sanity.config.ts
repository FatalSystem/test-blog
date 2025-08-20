import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@schemas'

const sanityProjectId = import.meta.env.SANITY_PROJECT_ID || 'brwxydjw'
const sanityDataset = import.meta.env.SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Tennibot Sanity',

  projectId: sanityProjectId,
  dataset: sanityDataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes
  }
})
