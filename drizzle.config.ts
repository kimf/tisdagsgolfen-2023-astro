import { defineConfig } from 'drizzle-kit';

const isProd = import.meta.env.PROD;

export default defineConfig({
  dialect: isProd ? 'turso' : 'sqlite',
  schema: './src/db/schema/*',
  out: './drizzle',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: import.meta.env.DATABASE_URL!,
    authToken: isProd ? import.meta.env.TURSO_AUTH_TOKEN : ''
  }
});
