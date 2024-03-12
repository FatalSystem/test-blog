import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import { astroImageTools } from 'astro-imagetools'
import react from '@astrojs/react'

import { sanityIntegration } from '@sanity/astro'
import 'dotenv/config'

const sanityProjectId = process.env.SANITY_PROJECT_ID
const sanityDataset = process.env.SANITY_DATASET

// https://astro.build/config
export default defineConfig({
  // experimental: {
  //   assets: true,
  // },
  output: 'hybrid',
  integrations: [tailwind(), react({
    experimentalReactChildren: true
  }), astroImageTools, sanityIntegration({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    useCdn: false,
    studioBasePath: '/admin'
  })]
})
