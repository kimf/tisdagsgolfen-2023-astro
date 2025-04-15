import type { InferSelectModel } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

const profiles = sqliteTable('profiles', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  fullName: text('full_name').notNull(),
  avatarUrl: text('avatar_url'),
  guest: integer('guest').notNull().default(0),
  active: integer('active').notNull().default(1)
});

export type Profile = InferSelectModel<typeof profiles>;

export function shortName(fullName: Profile['fullName']) {
  const parts = fullName.split(' ');
  return `${parts[0]} ${parts[1][0]}`;
}

export default profiles;
