ALTER TABLE `snippets_table` ADD COLUMN `description` TEXT DEFAULT '';
CREATE INDEX `Snippets_description_idx` ON `snippets_table` (`description`);