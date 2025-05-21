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
  redirects: {
    '/how-it-works/': '/rover/',
    '/call': 'https://calendly.com/haithameletrabi/introcall',
    '/T5setup': 'https://youtu.be/BerTwqWqAPo',
    '/t5setup': 'https://youtu.be/BerTwqWqAPo',
    '/unbox': 'https://youtu.be/vvNnUARbGz0',
    '/quickstart': 'https://www.youtube.com/watch?v=c7O39UYMls4',
    '/meeting': 'https://calendly.com/haithameletrabi/15-minute-call?month=2024-06',
    '/help': 'https://www.youtube.com/watch?v=BerTwqWqAPo',
    '/onboarding': 'https://calendly.com/haithameletrabi/onboarding',
    '/racketx': '/',
    '/partner-unbox': 'https://www.youtube.com/watch?v=JDwLmwHBj4A&t=1s'

  },
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
