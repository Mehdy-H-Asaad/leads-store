import { upstreamFetch } from "@/server/lib/upstream-fetch";
import {
	setAuthCookies,
	getRefreshToken,
	clearAuthCookies,
} from "@/shared/lib/cookies";
import type { TApiResponse } from "@/shared/lib/fetcher";
import type { TUpstreamRefreshDataDTO } from "@/server/types/auth.server-dto";

/**
 * Module-level singleton that deduplicates concurrent refresh attempts.
 *
 * Problem: if N requests arrive simultaneously with an expired access token,
 * all N would hit 401 and try to refresh in parallel. Since refresh tokens are
 * single-use (rotated on each use), only the first call would succeed and the
 * rest would invalidate the session.
 *
 * Solution: the first caller starts the refresh and stores the promise here.
 * Every subsequent caller that arrives while the refresh is still in-flight
 * awaits the SAME promise and receives the same new access token.
 * Once the refresh settles the slot is cleared so future expirations can
 * trigger a fresh refresh cycle.
 *
 * Limitation: this deduplication is per-process. In a multi-instance deployment
 * (multiple Node.js pods) each instance has its own module memory, so a small
 * number of duplicate refreshes may still occur across instances. The backend
 * should tolerate this with a short grace window on refresh token rotation.
 */
let refreshInFlight: Promise<string | null> | null = null;

export async function refreshAccessTokenOnce(): Promise<string | null> {
	if (refreshInFlight) return refreshInFlight;

	refreshInFlight = (async (): Promise<string | null> => {
		const refreshToken = await getRefreshToken();
		if (!refreshToken) return null;

		const response = await upstreamFetch("/auth/refresh", {
			method: "POST",
			body: { refresh_token: refreshToken },
			withAuth: false,
		});

		if (!response.ok) {
			await clearAuthCookies();
			return null;
		}

		const payload = (await response
			.json()
			.catch(() => null)) as TApiResponse<TUpstreamRefreshDataDTO> | null;

		if (!payload?.data) {
			await clearAuthCookies();
			return null;
		}

		await setAuthCookies(payload.data.access_token, payload.data.refresh_token);
		console.log("[refresh-singleton] token refreshed successfully");
		return payload.data.access_token;
	})().finally(() => {
		refreshInFlight = null;
	});

	return refreshInFlight;
}
