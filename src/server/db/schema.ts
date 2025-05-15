import { sql } from "drizzle-orm";
import {
	index,
	integer,
	sqliteTableCreator,
	text,
} from "drizzle-orm/sqlite-core";

const sqliteTable = sqliteTableCreator((name) => `${name}_table`);

// 定义业务表
export const snippets = sqliteTable(
	"snippets",
	{
		id: integer("id").primaryKey(),
		name: text("name").notNull(),
		description: text("description"),
		code: text("code").notNull(),
		order: integer("order")
			.notNull()
			.default(sql`(SELECT COALESCE(MAX("order") + 1, 0) FROM snippets_table)`),
		createdAt: integer("createdAt", { mode: "timestamp" })
			.default(sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`)
			.notNull(),
		updatedAt: integer("updatedAt", { mode: "timestamp" })
			.default(sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`)
			.notNull(),
	},
	(table) => [
		index("Snippets_name_idx").on(table.name),
		index("Snippets_order_idx").on(table.order),
	],
);

export type Snippet = typeof snippets.$inferSelect;
