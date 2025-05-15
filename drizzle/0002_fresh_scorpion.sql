ALTER TABLE `snippets_table` ADD COLUMN `order` INTEGER NOT NULL DEFAULT 0;
CREATE INDEX `Snippets_order_idx` ON `snippets_table` (`order`);