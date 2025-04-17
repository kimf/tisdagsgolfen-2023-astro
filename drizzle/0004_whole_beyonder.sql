CREATE TABLE `scorecards` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scoring_session_id` integer NOT NULL,
	`course_id` integer NOT NULL,
	`points` integer DEFAULT 0 NOT NULL,
	`strokes` integer DEFAULT 0 NOT NULL,
	`putts` integer DEFAULT 0 NOT NULL,
	`week_points` integer DEFAULT 0 NOT NULL,
	`given_strokes` integer DEFAULT 0 NOT NULL,
	`team_index` integer DEFAULT 0 NOT NULL,
	`through` integer DEFAULT 0 NOT NULL,
	`to_par` integer DEFAULT 0 NOT NULL,
	`current_hole` integer DEFAULT 1 NOT NULL,
	`part_of_final` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`scoring_session_id`) REFERENCES `scoring_sessions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP INDEX `holes_number_course_id_unique`;--> statement-breakpoint
DROP INDEX `holes_index_course_id_unique`;--> statement-breakpoint
CREATE INDEX `hole_course_number` ON `holes` (`course_id`,`number`);--> statement-breakpoint
CREATE INDEX `hole_course_index` ON `holes` (`course_id`,`index`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_scoring_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`owner_id` integer NOT NULL,
	`course_id` integer NOT NULL,
	`special` integer DEFAULT 0,
	`strokes` integer DEFAULT 0,
	`team_event` integer DEFAULT 0,
	`state` text DEFAULT 'STARTED',
	`current_hole` integer DEFAULT 1,
	`part_of_final` integer DEFAULT 0,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_scoring_sessions`("id", "owner_id", "course_id", "special", "strokes", "team_event", "state", "current_hole", "part_of_final", "created_at") SELECT "id", "owner_id", "course_id", "special", "strokes", "team_event", "state", "current_hole", "part_of_final", "created_at" FROM `scoring_sessions`;--> statement-breakpoint
DROP TABLE `scoring_sessions`;--> statement-breakpoint
ALTER TABLE `__new_scoring_sessions` RENAME TO `scoring_sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;