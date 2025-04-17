import { relations, sql, type InferSelectModel } from 'drizzle-orm';
import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core';

import courses from './course';

const holes = sqliteTable(
  'holes',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    index: integer('index').notNull(),
    courseId: integer('course_id')
      .references(() => courses.id, { onDelete: 'cascade' })
      .notNull(),
    number: integer('number').notNull(),
    par: integer('par').notNull(),
    createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
  },
  (t) => [
    index('hole_course_number').on(t.courseId, t.number),
    index('hole_course_index').on(t.courseId, t.index)
  ]
);

export const holesRelations = relations(holes, ({ one }) => ({
  course: one(courses)
}));

export type Hole = InferSelectModel<typeof holes>;

export default holes;
