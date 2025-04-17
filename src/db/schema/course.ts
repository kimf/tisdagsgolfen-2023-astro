import { relations, sql, type InferSelectModel } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import scoringSessions from './scoring_sessions';
import holes from './hole';
import scorecards from './scorecard';

const courses = sqliteTable('courses', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  club: text('club').notNull(),
  name: text('name').notNull(),
  par: integer('par').notNull(),
  holesCount: integer('holes_count').notNull().default(0),
  eventsCount: integer('events_count').notNull().default(0),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
});

export const coursesRelations = relations(courses, ({ many }) => ({
  scoringSessions: many(scoringSessions),
  scorecards: many(scorecards),
  holes: many(holes)
}));

export type Course = InferSelectModel<typeof courses>;

export default courses;
