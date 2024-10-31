import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

const profiles = sqliteTable('profiles', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  fullName: text('full_name').notNull(),
  avatarUrl: text('avatar_url'),
  guest: integer('guest').notNull().default(0),
  active: integer('active').notNull().default(1)
});

export default profiles;
