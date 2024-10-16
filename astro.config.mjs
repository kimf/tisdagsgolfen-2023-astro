import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import playformCompress from '@playform/compress';
import compressor from 'astro-compressor';
import webmanifest from 'astro-webmanifest';
import fs from 'fs';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  integrations: [
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
    }),
    playformCompress(),
    compressor({ gzip: false, brotli: true }),
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
        },
      },
    ],
  }
});
