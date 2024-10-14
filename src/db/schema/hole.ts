import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable, unique } from 'drizzle-orm/sqlite-core';
import courses from './course';

const holes = sqliteTable(
  'holes',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    index: integer('index').notNull(),
    courseId: integer('course_id')
      .notNull()
      .references(() => courses.id),
    number: integer('number').notNull(),
    par: integer('par').notNull(),
    createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
  },
  (t) => ({
    unq_number: unique().on(t.number, t.courseId),
    unq_index: unique().on(t.index, t.courseId)
  })
);

export default holes;
