import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@schemas'

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
