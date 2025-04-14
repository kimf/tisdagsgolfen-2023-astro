import { sql, type InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const seasons = sqliteTable('seasons', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  state: text('state').default('REGULAR'),
  winnersArray: text('winners_array'),
  closedAt: text('closed_at'),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
});

export type Season = InferSelectModel<typeof seasons>;

export default seasons;
