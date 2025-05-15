import type { D1Database } from "@cloudflare/workers-types";
import { drizzle } from "drizzle-orm/d1";
import { env } from "hono/adapter";
import { HTTPException } from "hono/http-exception";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { jstack } from "jstack";

/**
 * Environment type definitions
 */
export interface Env {
	Bindings: {
		D1_DATABASE: D1Database;
	};
}

/**
 * User type definition
 */
export interface User {
	id: string;
	name: string;
	email: string;
	avatar: string;
	role: string;
	permissions: string;
}

/**
 * Initialize jstack with environment type
 */
export const j = jstack.init<Env>();

/**
 * Middleware definitions
 */
const publicMiddleware = j.middleware(async ({ c, next }) => {
	const { D1_DATABASE } = env(c);

	return await next({
		db: drizzle(D1_DATABASE),
	});
});

const authMiddleware = j.middleware(async ({ c, next, ctx }) => {
	const authHeader = c.req.header("Authorization");
	const token = authHeader?.replace("Bearer ", "");

	if (!token) {
		throw new HTTPException(401, {
			message: "未授权，请登录继续",
		});
	}

	try {
		// 1. 创建JWKS客户端
		const JWKS = createRemoteJWKSet(
			new URL(env(c).CLERK_JWKS_ENDPOINT as string),
		);

		// 2. 验证JWT
		const { payload } = await jwtVerify(token, JWKS, {
			issuer: env(c).CLERK_JWT_ISSUER as string,
		});

		// 4. 从payload中获取用户信息
		const user = {
			id: payload.sub || "",
			name: payload.name?.toString() || "User",
			email: payload.email?.toString() || "User",
			avatar: payload.avatar?.toString() || "User",
			role: payload.role?.toString() || "User",
			permissions: payload.permissions?.toString() || "User",
		};

		if (user.role !== "admin") {
			throw new HTTPException(403, {
				message: "您没有权限访问此资源",
			});
		}

		return await next({ user, ...ctx });
	} catch (error) {
		console.error("JWT验证错误:", error);
		throw new HTTPException(401, {
			message: "无效的认证令牌",
		});
	}
});

/**
 * Public procedure - accessible without authentication
 * Includes database and KV store access
 */
export const publicProcedure = j.procedure.use(publicMiddleware);

/**
 * Private procedure - requires authentication
 * Extends public procedure with auth middleware
 */
export const privateProcedure = publicProcedure.use(authMiddleware);
