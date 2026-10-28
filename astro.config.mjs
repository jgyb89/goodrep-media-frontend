import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://goodrep.media',
  trailingSlash: 'always',
  image: {
    domains: ['wp.goodrep.media', 'goodrep.media'],
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => 
        !page.includes('/paid-ads/') &&
        !page.includes('/social-media/') &&
        !page.includes('/sms-marketing/') &&
        !page.includes('/our-work/') &&
        !page.includes('/thankyou/')
    })
  ]
});
