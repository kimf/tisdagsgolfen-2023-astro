CREATE TABLE `profiles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`avatar_url` text,
	`team_event` integer DEFAULT 0 NOT NULL,
	`active` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `scoring_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`owner_id` text NOT NULL,
	`course_id` integer NOT NULL,
	`special` integer DEFAULT 0 NOT NULL,
	`strokes` integer DEFAULT 0 NOT NULL,
	`team_event` integer DEFAULT 0 NOT NULL,
	`state` text DEFAULT 'STARTED' NOT NULL,
	`current_hole` integer DEFAULT 1 NOT NULL,
	`part_of_final` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
