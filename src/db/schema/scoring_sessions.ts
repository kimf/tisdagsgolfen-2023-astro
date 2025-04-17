import { relations, sql, type InferSelectModel } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import courses from './course';
import scorecards from './scorecard';
import profiles from './profile';

const scoringSessions = sqliteTable('scoring_sessions', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  ownerId: integer('owner_id').notNull(),
  courseId: integer('course_id')
    .references(() => courses.id)
    .notNull(),
  special: integer('special').default(0),
  strokes: integer('strokes').default(0),
  teamEvent: integer('team_event').default(0),
  state: text('state').default('STARTED'),
  currentHole: integer('current_hole').default(1),
  partOfFinal: integer('part_of_final').default(0),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
});

export const scoringSessionRelations = relations(scoringSessions, ({ one, many }) => ({
  scorecards: many(scorecards),
  course: one(courses, {
    fields: [scoringSessions.courseId],
    references: [courses.id]
  }),
  owner: one(profiles, {
    fields: [scoringSessions.ownerId],
    references: [profiles.id]
  })
}));

export type ScoringSession = InferSelectModel<typeof scoringSessions>;

export default scoringSessions;
