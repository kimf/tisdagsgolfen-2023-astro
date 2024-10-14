import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import courses from "./schema/course";
import seasons from "./schema/season";

import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const sqlite = new Database(import.meta.env.DATABASE_URL);

export const db = drizzle(sqlite, { schema: { courses, seasons } });

migrate(db, { migrationsFolder: "./drizzle" });
