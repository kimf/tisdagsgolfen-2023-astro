/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    globals: true,
    environment: 'node', // or 'jsdom' if you want to test browser code
    include: ['_spec/**/*.spec.{ts,js}'],
    coverage: {
      include: ['src/**/*']
    },
    setupFiles: ['./_spec/setup.ts']
  }
});
