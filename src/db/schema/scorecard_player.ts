import { relations, sql, type InferSelectModel } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import profiles from './profile';
import scorecards from './scorecard';

const scorecardPlayers = sqliteTable('scorecard_players', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  playerId: integer('player_id')
    .references(() => profiles.id, { onDelete: 'cascade' })
    .notNull(),
  scorecardId: integer('scorecard_id')
    .references(() => scorecards.id, { onDelete: 'cascade' })
    .notNull(),
  beers: integer('beers').default(0),
  fines: integer('fines').default(0),
  ciders: integer('ciders').default(0),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
});

export const scorecardPlayersRelations = relations(scorecardPlayers, ({ one, many }) => ({
  player: one(profiles, {
    fields: [scorecardPlayers.playerId],
    references: [profiles.id]
  }),
  scorecard: one(scorecards, {
    fields: [scorecardPlayers.scorecardId],
    references: [scorecards.id]
  })
}));

export type ScorecardPlayer = InferSelectModel<typeof scorecardPlayers>;

export default scorecardPlayers;
