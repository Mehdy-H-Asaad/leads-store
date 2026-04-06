import { getAccessToken } from "@/shared/lib/cookies";

type UpstreamOptions = {
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	body?: unknown;
	/**
	 * Extra headers. These are merged last, so callers can override anything
	 * (e.g. the refresh route passes `Cookie: refresh_token=...` instead of Bearer).
	 */
	headers?: Record<string, string>;
	/**
	 * When true (default), reads the access_token httpOnly cookie and attaches it
	 * as `Authorization: Bearer <token>`. Set to false for public endpoints
	 * (login, signup, refresh) that don't need or cannot use the access token.
	 */
	withAuth?: boolean;
	cache?: RequestCache;
};

/**
 * Server-only wrapper around `fetch` for Next.js route handlers → FastAPI calls.
 * Never use this on the client; import `apiFetcher` from `@/shared/lib/fetcher` instead.
 *
 * Returns the raw `Response` so callers can inspect status and parse JSON themselves.
 */
export async function upstreamFetch(
	path: string,
	options: UpstreamOptions = {}
): Promise<Response> {
	const {
		method = "GET",
		body,
		headers = {},
		withAuth = true,
		cache,
	} = options;

	const BACKEND_URL = process.env.BACKEND_URL;
	if (!BACKEND_URL) throw new Error("BACKEND_URL is not configured");

	const accessToken = withAuth ? await getAccessToken() : null;

	return fetch(`${BACKEND_URL}${path}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
			...headers,
		},
		body: body ? JSON.stringify(body) : undefined,
		cache,
	});
}
