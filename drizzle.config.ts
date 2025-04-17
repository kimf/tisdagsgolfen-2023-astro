import { defineConfig } from 'drizzle-kit';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  dialect: isProd ? 'turso' : 'sqlite',
  schema: './src/db/schema/*',
  out: './drizzle',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: isProd ? process.env.TURSO_AUTH_TOKEN : ''
  }
});
