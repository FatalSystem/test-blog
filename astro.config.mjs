import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import { astroImageTools } from 'astro-imagetools'
import react from '@astrojs/react'

import { sanityIntegration } from '@sanity/astro'

// https://astro.build/config
export default defineConfig({
  // experimental: {
  //   assets: true,
  // },
  output: 'hybrid',
  integrations: [tailwind(), react({
    experimentalReactChildren: true
  }), astroImageTools, sanityIntegration({
    projectId: '3nx5ege4',
    dataset: 'production',
    useCdn: false,
    studioBasePath: '/admin'
  })]
})
