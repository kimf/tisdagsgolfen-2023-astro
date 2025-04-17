import { defineConfig } from 'drizzle-kit';

const isVercel = process.env.VERCEL;

export default defineConfig({
  dialect: isVercel ? 'turso' : 'sqlite',
  schema: './src/db/schema/*',
  out: './drizzle',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: isVercel ? process.env.TURSO_AUTH_TOKEN : ''
  }
});
