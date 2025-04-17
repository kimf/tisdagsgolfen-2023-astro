import { relations, type InferSelectModel } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import scoringSessions from './scoring_sessions';
import scorecardPlayers from './scorecard_player';

const profiles = sqliteTable('profiles', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  fullName: text('full_name').notNull(),
  avatarUrl: text('avatar_url'),
  guest: integer('guest').notNull().default(0),
  active: integer('active').notNull().default(1)
});

export const profilesRelations = relations(profiles, ({ many }) => ({
  scoringSessions: many(scoringSessions),
  scorecards: many(scorecardPlayers)
}));

export type Profile = InferSelectModel<typeof profiles>;

export default profiles;
