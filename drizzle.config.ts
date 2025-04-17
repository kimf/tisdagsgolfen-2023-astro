import { defineConfig } from 'drizzle-kit';

const isVercel = process.env.VERCEL;

console.log('IS PROD?', isVercel);
console.log(process.env.DATABASE_URL);
console.log(process.env.TURSO_AUTH_TOKEN);

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
