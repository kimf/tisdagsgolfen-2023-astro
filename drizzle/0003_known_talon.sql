PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_scoring_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`owner_id` text NOT NULL,
	`course_id` integer NOT NULL,
	`special` integer DEFAULT 0 NOT NULL,
	`strokes` integer DEFAULT 0 NOT NULL,
	`team_event` integer DEFAULT 0 NOT NULL,
	`state` text DEFAULT 'STARTED' NOT NULL,
	`current_hole` integer DEFAULT 1 NOT NULL,
	`part_of_final` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_scoring_sessions`("id", "owner_id", "course_id", "special", "strokes", "team_event", "state", "current_hole", "part_of_final", "created_at") SELECT "id", "owner_id", "course_id", "special", "strokes", "team_event", "state", "current_hole", "part_of_final", "created_at" FROM `scoring_sessions`;--> statement-breakpoint
DROP TABLE `scoring_sessions`;--> statement-breakpoint
ALTER TABLE `__new_scoring_sessions` RENAME TO `scoring_sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
