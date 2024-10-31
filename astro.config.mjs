import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import playformCompress from '@playform/compress';
import compressor from 'astro-compressor';
import AstroPWA from '@vite-pwa/astro';
import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';

import svelte from '@astrojs/svelte';

import react from '@astrojs/react';

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m'
};

function format(msg, prefix = '') {
  const start = prefix;
  const end = prefix ? COLORS.reset : '';
  return `${start}moving-legacy-content:${end} ${msg}`;
}

// TODO: Move to Dockerfile instead!
const copyLegacyContent = () => ({
  name: 'copy-legacy-content',
  hooks: {
    'astro:build:done': async () => {
      const legacyDir = path.join(process.cwd(), '_legacy');
      const publicDir = path.join(process.cwd(), './dist/client');

      try {
        if (fsExtra.pathExistsSync(legacyDir)) {
          fsExtra.copySync(legacyDir, publicDir, { overwrite: true });
          console.log(
            format('Successfully moved _legacy contents to public directory', COLORS.green)
          );
        } else {
          console.log(format('_legacy directory not found, skipping', COLORS.yellow));
        }
      } catch (err) {
        console.error(format('Error moving _legacy contents:', err, COLORS.red));
      }
    }
  }
});

//   name: 'Tisdagsgolfen',
//   id: 'se.fransman.tisdagsgolfen',
//   icon: 'src/images/logo.png',
//   short_name: 'TG',
//   start_url: '/',
//   display: 'standalone',
//   display_override: ['standalone'],
//   theme_color: '#008080',
//   background_color: '#C7E0D9',
//   orientation: 'portrait-primary'

export default defineConfig({
  integrations: [
    AstroPWA({
      experimental: {
        directoryAndTrailingSlashHandler: true
      }
    }),
    playformCompress(),
    compressor({ gzip: false, brotli: true }),
    copyLegacyContent(),
    svelte(),
    react()
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
    defaultStrategy: 'hover'
  },
  experimental: {
    clientPrerender: true
  },
  vite: {
    // This is a workaround to allow serving HTML files without extensions
    // it only affects the development server, so don't forget to fix this in production as well
    plugins: [
      {
        name: 'serve-html-without-extension',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const publicDir = path.join(process.cwd(), 'public');
            let filePath = path.join(publicDir, req.url);

            // Remove query parameters and hash from the URL
            filePath = filePath.split('?')[0].split('#')[0];

            // Check for index.html
            if (fs.existsSync(path.join(filePath, 'index.html'))) {
              req.url = path.join(req.url, 'index.html');
            }
            // Check for .html file
            else if (fs.existsSync(`${filePath}.html`)) {
              req.url = `${req.url}.html`;
            }
            // Check for file without extension
            else if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              // Do nothing, serve the file as-is
            }
            // If none of the above, let Astro handle it
            else {
              // Do nothing, let Astro's routing handle it
            }

            next();
          });
        }
      }
    ]
  }
});
