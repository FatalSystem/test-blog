import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@schemas'

const sanityProjectId = import.meta.env.SANITY_PROJECT_ID
const sanityDataset = import.meta.env.SANITY_DATASET

export default defineConfig({
  name: 'default',
  title: 'Tennibot Sanity',

  projectId: '3nx5ege4',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes
  }
})
