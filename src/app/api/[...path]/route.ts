import { upstreamFetch } from "@/server/lib/upstream-fetch";
import { refreshAccessTokenOnce } from "@/server/lib/refresh-singleton";
import {
	bffErrorResponse,
	messageFromUpstreamError,
} from "@/shared/lib/bff-response";
import { NextRequest, NextResponse } from "next/server";

/**
 * Catch-all authenticated proxy.
 *
 * Every client request to /api/* that does NOT match a more specific route handler
 * (e.g. /api/auth/login, /api/auth/refresh) lands here. This handler:
 *   1. Reads the access_token httpOnly cookie via upstreamFetch (withAuth: true)
 *   2. Attaches it as Authorization: Bearer to the upstream FastAPI request
 *   3. If the upstream returns 401, silently refreshes the token pair and retries once
 *   4. Returns the upstream response body and status code unchanged
 *
 * This means you do NOT need individual route handlers for items, customers, etc.
 * Add a dedicated route handler only when you need special logic (e.g. setting cookies).
 */

type RouteContext = {
	params: Promise<{ path: string[] }>;
};

type AllowedMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function handler(request: NextRequest, context: RouteContext) {
	const { path } = await context.params;
	const upstreamPath = "/" + path.join("/");

	const { searchParams } = new URL(request.url);
	const qs = searchParams.toString();
	const fullPath = qs ? `${upstreamPath}?${qs}` : upstreamPath;

	const method = request.method as AllowedMethod;
	const hasBody = method !== "GET" && method !== "DELETE";
	const body = hasBody
		? await request.json().catch(() => undefined)
		: undefined;

	try {
		let upstream = await upstreamFetch(fullPath, {
			method,
			body,
			withAuth: true,
		});

		// Access token expired — attempt a silent server-side refresh and retry once.
		// refreshAccessTokenOnce() deduplicates concurrent refresh attempts so that
		// N simultaneous 401s only ever trigger a single upstream refresh call.
		if (upstream.status === 401) {
			const newAccessToken = await refreshAccessTokenOnce();

			if (newAccessToken) {
				upstream = await upstreamFetch(fullPath, {
					method,
					body,
					withAuth: false,
					headers: {
						Authorization: `Bearer ${newAccessToken}`,
					},
				});
			}
		}

		// 204 No Content (and similar) — no body to parse or return.
		const hasBody = upstream.status !== 204 && upstream.status !== 304;

		const payload = hasBody ? await upstream.json().catch(() => null) : null;

		if (!upstream.ok) {
			console.log(upstream);
			console.log("payload", payload);
			console.log("upstream.status", upstream.status);
			return bffErrorResponse(
				messageFromUpstreamError(payload ?? {}),
				upstream.status,
				(payload as { detail?: unknown } | null)?.detail
			);
		}

		if (!hasBody) {
			return new NextResponse(null, { status: upstream.status });
		}

		return NextResponse.json(payload, { status: upstream.status });
	} catch (error) {
		console.log("error", error);
		return bffErrorResponse("Failed to reach backend service", 502);
	}
}

export {
	handler as GET,
	handler as POST,
	handler as PUT,
	handler as PATCH,
	handler as DELETE,
};
