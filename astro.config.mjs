import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import playformCompress from '@playform/compress';
import webmanifest from 'astro-webmanifest';

// https://astro.build/config
export default defineConfig({
  integrations: [
    playformCompress(),
    webmanifest({
      name: 'Tisdagsgolfen',
      id: 'se.fransman.tisdagsgolfen',
      icon: 'src/images/logo.png',
      short_name: 'TG',
      start_url: '/',
      display: 'standalone',
      display_override: ['standalone'],
      theme_color: '#008080',
      background_color: '#C7E0D9',
      orientation: 'portrait-primary'
    })
  ],
  output: 'static',
  image: {
    domains: []
  },
  adapter: node({
    mode: 'standalone'
  }),
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load'
  },
  experimental: {
    clientPrerender: true
  }
});
