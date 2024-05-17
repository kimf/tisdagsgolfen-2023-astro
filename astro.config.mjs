import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

import react from '@astrojs/react';

// https://astro.build/config
import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), playformCompress()],
  output: 'server',
  adapter: vercel({
    analytics: true
  })
});