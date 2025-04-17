import { relations, sql, type InferSelectModel } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import courses from './course';

const scoringSessions = sqliteTable('scoring_sessions', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  ownerId: text('owner_id').notNull(),
  courseId: integer('course_id')
    .notNull()
    .references(() => courses.id),
  special: integer('special').notNull().default(0),
  strokes: integer('strokes').notNull().default(0),
  teamEvent: integer('team_event').notNull().default(0),
  state: text('state').notNull().default('STARTED'),
  currentHole: integer('current_hole').notNull().default(1),
  partOfFinal: integer('part_of_final').notNull().default(0),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
});

export const scoringSessionRelations = relations(scoringSessions, ({ one }) => ({
  course: one(courses, {
    fields: [scoringSessions.courseId],
    references: [courses.id]
  })
}));

export type ScoringSession = InferSelectModel<typeof scoringSessions>;

export default scoringSessions;
