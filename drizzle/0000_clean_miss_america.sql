CREATE TABLE `snippets_table` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`code` text NOT NULL,
	`order` integer NOT NULL,
	`createdAt` integer DEFAULT (unixepoch('now', 'millisecond')) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch('now', 'millisecond')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `Snippets_name_idx` ON `snippets_table` (`name`);--> statement-breakpoint
CREATE INDEX `Snippets_order_idx` ON `snippets_table` (`order`);