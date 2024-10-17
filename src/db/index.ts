import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import courses from "./schema/course";
import seasons from "./schema/season";

const dbUrl = import.meta.env.DATABASE_URL;

if (!dbUrl) {
  console.error("DATABASE_URL is not set");
  throw new Error("DATABASE_URL is not set");
}

const sqlite = new Database(import.meta.env.DATABASE_URL);

export const db = drizzle(sqlite, { schema: { courses, seasons } });
