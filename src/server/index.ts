import { cors } from "hono/cors";
import { dynamic } from "jstack";
import { j } from "./jstack";
/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 *
 * @see https://jstack.app/docs/backend/app-router
 */
const api = j
	.router()
	.basePath("/api")
	.use(
		cors({
			origin: [
				"http://localhost:3000",
				"https://snippets-collection.vercel.app",
			],
			allowHeaders: [
				"x-is-superjson",
				"Authorization",
				"Content-Type",
				"content-type",
			],
			exposeHeaders: ["x-is-superjson"],
			credentials: true,
		}),
	)
	.onError(j.defaults.errorHandler);

/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 */
const appRouter = j.mergeRouters(api, {
	snippet: dynamic(() => import("./routers/snippet-router")),
});

export type AppRouter = typeof appRouter;

export default appRouter;
