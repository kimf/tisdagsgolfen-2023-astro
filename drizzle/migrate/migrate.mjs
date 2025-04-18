// This file is used to migrate the database to the current version
// It is run when the docker container starts
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

const migrationsFolder = process.argv[2] ?? '../';

const sqlite = new Database(process.env.DATABASE_URL);

const db = drizzle(sqlite);

migrate(db, { migrationsFolder });
