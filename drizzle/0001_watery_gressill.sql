ALTER TABLE `posts_table` RENAME TO `snippets_table`;--> statement-breakpoint
DROP INDEX `Post_name_idx`;--> statement-breakpoint
ALTER TABLE `snippets_table` ADD `code` text NOT NULL;--> statement-breakpoint
CREATE INDEX `Snippets_name_idx` ON `snippets_table` (`name`);