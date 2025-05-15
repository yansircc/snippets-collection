import { snippets } from "@/server/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { j, privateProcedure, publicProcedure } from "../jstack";

// 代码片段验证模式
const snippetSchema = z.object({
	name: z.string().min(1, "标题不能为空"),
	code: z.string().min(1, "代码不能为空"),
	description: z.string().optional(),
});

const snippetIdSchema = z.object({ id: z.number() });

const updateOrderSchema = z.object({
	id: z.number(),
	order: z.number().min(0),
});

export const snippetRouter = j.router({
	// 获取所有代码片段
	getAll: publicProcedure.query(async ({ c, ctx }) => {
		const { db } = ctx;
		const allSnippets = await db
			.select()
			.from(snippets)
			.orderBy(snippets.order);
		return c.superjson(allSnippets);
	}),

	// 通过ID获取代码片段
	getById: publicProcedure
		.input(snippetIdSchema)
		.query(async ({ c, ctx, input }) => {
			const { db } = ctx;
			const [snippet] = await db
				.select()
				.from(snippets)
				.where(eq(snippets.id, input.id));
			return c.superjson(snippet ?? null);
		}),

	// 创建新代码片段
	create: privateProcedure
		.input(snippetSchema)
		.mutation(async ({ ctx, c, input }) => {
			const { db } = ctx;
			// 获取最大的 order 值并加1
			const [result] = await db
				.select({
					maxOrder: sql<number>`COALESCE(MAX(${snippets.order}), -1)`,
				})
				.from(snippets);
			const nextOrder = (result?.maxOrder ?? -1) + 1;

			const snippet = await db
				.insert(snippets)
				.values({ ...input, order: nextOrder });
			return c.superjson(snippet);
		}),

	// 更新代码片段
	update: privateProcedure
		.input(
			snippetSchema.extend({
				id: z.number(),
				order: z.number().min(0),
			}),
		)
		.mutation(async ({ ctx, c, input }) => {
			const { id, ...data } = input;
			const { db } = ctx;

			await db
				.update(snippets)
				.set({ ...data, updatedAt: new Date() })
				.where(eq(snippets.id, id));

			const [updated] = await db
				.select()
				.from(snippets)
				.where(eq(snippets.id, id));

			return c.superjson(updated);
		}),

	// 更新排序
	updateOrder: privateProcedure
		.input(updateOrderSchema)
		.mutation(async ({ ctx, c, input }) => {
			const { id, order } = input;
			const { db } = ctx;

			await db
				.update(snippets)
				.set({ order, updatedAt: new Date() })
				.where(eq(snippets.id, id));

			const [updated] = await db
				.select()
				.from(snippets)
				.where(eq(snippets.id, id));

			return c.superjson(updated);
		}),

	// 删除代码片段
	delete: privateProcedure
		.input(snippetIdSchema)
		.mutation(async ({ ctx, c, input }) => {
			const { db } = ctx;
			await db.delete(snippets).where(eq(snippets.id, input.id));
			return c.superjson({ success: true, id: input.id });
		}),
});
