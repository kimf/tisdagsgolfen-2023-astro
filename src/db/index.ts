import { createClient } from '@libsql/client';

import { drizzle } from 'drizzle-orm/libsql';

import {
  courses,
  coursesrelations,
  holes,
  profiles,
  scoringSessionRelations,
  seasons,
  scoringSessions
} from './schema';

const url = import.meta.env.DATABASE_URL;

if (!url) {
  console.error('DATABASE_URL is not set');
  throw new Error('DATABASE_URL is not set');
}

let authToken = '';
if (import.meta.env.PROD) {
  authToken = import.meta.env.TURSO_AUTH_TOKEN;

  if (!authToken || authToken === '') {
    console.error('TURSO_AUTH_TOKEN is not set');
    throw new Error('TURSO_AUTH_TOKEN is not set');
  }
}

const turso = createClient({ url, authToken });

const db = drizzle(turso, {
  schema: {
    courses,
    seasons,
    scoringSessions,
    profiles,
    holes,
    scoringSessionRelations,
    coursesrelations
  }
});

export default db;
