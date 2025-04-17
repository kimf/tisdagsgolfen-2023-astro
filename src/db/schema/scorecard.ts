import { relations, sql, type InferSelectModel } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import courses from './course';
import scoringSessions from './scoring_sessions';
import scorecardPlayers from './scorecard_player';

const scorecards = sqliteTable('scorecards', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  scoringSessionId: integer('scoring_session_id')
    .references(() => scoringSessions.id, { onDelete: 'cascade' })
    .notNull(),
  courseId: integer('course_id')
    .references(() => courses.id)
    .notNull(),
  points: integer('points').default(0),
  strokes: integer('strokes').default(0),
  putts: integer('putts').default(0),
  weekPoints: integer('week_points').default(0),
  givenStrokes: integer('given_strokes').default(0),
  teamIndex: integer('team_index').default(0),
  through: integer('through').default(0),
  toPar: integer('to_par').default(0),
  currentHole: integer('current_hole').default(1),
  partOfFinal: integer('part_of_final').default(0),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
});

export const scorecardsRelations = relations(scorecards, ({ one, many }) => ({
  course: one(courses),
  players: many(scorecardPlayers),
  scoringSession: one(scoringSessions)
}));

export type Scorecard = InferSelectModel<typeof scorecards>;

export default scorecards;
