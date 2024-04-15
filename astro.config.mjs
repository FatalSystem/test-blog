import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import { astroImageTools } from 'astro-imagetools'
import react from '@astrojs/react'
import { sanityIntegration } from '@sanity/astro'
import 'dotenv/config'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'
const sanityProjectId = process.env.SANITY_PROJECT_ID
const sanityDataset = process.env.SANITY_DATASET

// https://astro.build/config
export default defineConfig({
  // experimental: {
  //   assets: true,
  // },
  site: 'https://www.tennibot.com',
  output: 'hybrid',
  integrations: [tailwind(), sitemap(), react({
    experimentalReactChildren: true
  }), astroImageTools, sanityIntegration({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    useCdn: false,
    studioBasePath: '/admin'
  })],
  adapter: netlify()
})
