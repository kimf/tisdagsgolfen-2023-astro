import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import supabase from 'astro-supabase';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
import playformCompress from '@playform/compress';

// Load your Supabase credentials from your .env file
const { SUPABASE_URL, SUPABASE_ANON_KEY } = loadEnv('', process.cwd(), 'SUPABASE');

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    playformCompress(),
    supabase({
      supabaseKey: SUPABASE_ANON_KEY,
      supabaseUrl: SUPABASE_URL,
    }),
  ],
  output: 'server',
  image: {
    domains: [],
  },
  adapter: node({
    mode: 'standalone',
  }),
});
