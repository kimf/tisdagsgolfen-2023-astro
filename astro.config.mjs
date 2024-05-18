import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import { loadEnv } from 'vite';
import supabase from 'astro-supabase';
import react from '@astrojs/react';

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
  adapter: vercel({
    analytics: true,
  }),
});
