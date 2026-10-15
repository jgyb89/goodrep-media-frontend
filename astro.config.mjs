import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://goodrep.media', // Required for sitemap generation
  integrations: [react(), sitemap()]
});
