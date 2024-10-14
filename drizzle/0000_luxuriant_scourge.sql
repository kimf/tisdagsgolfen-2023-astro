CREATE TABLE `courses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`club` text NOT NULL,
	`name` text NOT NULL,
	`par` integer NOT NULL,
	`holes_count` integer DEFAULT 0 NOT NULL,
	`events_count` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `holes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`index` integer NOT NULL,
	`course_id` integer NOT NULL,
	`number` integer NOT NULL,
	`par` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `holes_number_course_id_unique` ON `holes` (`number`,`course_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `holes_index_course_id_unique` ON `holes` (`index`,`course_id`);--> statement-breakpoint
CREATE TABLE `seasons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`state` text DEFAULT 'REGULAR',
	`winners_array` text,
	`closed_at` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
