import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import node from '@astrojs/node';

import pageInsight from 'astro-page-insight';
import playformCompress from '@playform/compress';
import supabase from 'astro-supabase';
import webmanifest from 'astro-webmanifest';

const { SUPABASE_URL, SUPABASE_ANON_KEY } = loadEnv('', process.cwd(), 'SUPABASE');

// https://astro.build/config
export default defineConfig({
  integrations: [
    playformCompress(),
    supabase({
      supabaseKey: SUPABASE_ANON_KEY,
      supabaseUrl: SUPABASE_URL,
    }),
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
      orientation: 'portrait-primary',
    }),
    pageInsight(),
  ],
  output: 'static',
  image: {
    domains: [],
  },
  adapter: node({
    mode: 'standalone',
  }),
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load',
  },
  experimental: {
    clientPrerender: true,
  },
});
