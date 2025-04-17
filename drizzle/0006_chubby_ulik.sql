PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_holes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`index` integer NOT NULL,
	`course_id` integer NOT NULL,
	`number` integer NOT NULL,
	`par` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_holes`("id", "index", "course_id", "number", "par", "created_at") SELECT "id", "index", "course_id", "number", "par", "created_at" FROM `holes`;--> statement-breakpoint
DROP TABLE `holes`;--> statement-breakpoint
ALTER TABLE `__new_holes` RENAME TO `holes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `hole_course_number` ON `holes` (`course_id`,`number`);--> statement-breakpoint
CREATE INDEX `hole_course_index` ON `holes` (`course_id`,`index`);--> statement-breakpoint
CREATE TABLE `__new_scorecard_players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`player_id` integer NOT NULL,
	`scorecard_id` integer NOT NULL,
	`beers` integer DEFAULT 0,
	`fines` integer DEFAULT 0,
	`ciders` integer DEFAULT 0,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`player_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`scorecard_id`) REFERENCES `scorecards`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_scorecard_players`("id", "player_id", "scorecard_id", "beers", "fines", "ciders", "created_at") SELECT "id", "player_id", "scorecard_id", "beers", "fines", "ciders", "created_at" FROM `scorecard_players`;--> statement-breakpoint
DROP TABLE `scorecard_players`;--> statement-breakpoint
ALTER TABLE `__new_scorecard_players` RENAME TO `scorecard_players`;--> statement-breakpoint
CREATE TABLE `__new_scorecards` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scoring_session_id` integer NOT NULL,
	`course_id` integer NOT NULL,
	`points` integer DEFAULT 0,
	`strokes` integer DEFAULT 0,
	`putts` integer DEFAULT 0,
	`week_points` integer DEFAULT 0,
	`given_strokes` integer DEFAULT 0,
	`team_index` integer DEFAULT 0,
	`through` integer DEFAULT 0,
	`to_par` integer DEFAULT 0,
	`current_hole` integer DEFAULT 1,
	`part_of_final` integer DEFAULT 0,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`scoring_session_id`) REFERENCES `scoring_sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_scorecards`("id", "scoring_session_id", "course_id", "points", "strokes", "putts", "week_points", "given_strokes", "team_index", "through", "to_par", "current_hole", "part_of_final", "created_at") SELECT "id", "scoring_session_id", "course_id", "points", "strokes", "putts", "week_points", "given_strokes", "team_index", "through", "to_par", "current_hole", "part_of_final", "created_at" FROM `scorecards`;--> statement-breakpoint
DROP TABLE `scorecards`;--> statement-breakpoint
ALTER TABLE `__new_scorecards` RENAME TO `scorecards`;