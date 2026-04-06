import { upstreamFetch } from "@/server/lib/upstream-fetch";
import {
	setAuthCookies,
	getRefreshToken,
	clearAuthCookies,
} from "@/shared/lib/cookies";
import {
	bffErrorResponse,
	messageFromUpstreamError,
} from "@/shared/lib/bff-response";
import type { TApiResponse } from "@/shared/lib/fetcher";
import type { TUpstreamRefreshDataDTO } from "@/server/types/auth.server-dto";
import { NextResponse } from "next/server";

export async function POST() {
	const refreshToken = await getRefreshToken();

	if (!refreshToken) {
		return bffErrorResponse("No refresh token present", 401);
	}

	try {
		const response = await upstreamFetch("/auth/refresh", {
			method: "POST",
			body: { refresh_token: refreshToken },
			withAuth: false,
		});

		const payload = await response.json().catch(() => null);

		if (!response.ok) {
			await clearAuthCookies();
			return bffErrorResponse(
				messageFromUpstreamError(payload ?? {}),
				response.status,
				(payload as { detail?: unknown } | null)?.detail
			);
		}

		const ok = payload as TApiResponse<TUpstreamRefreshDataDTO>;

		if (!ok?.data) {
			return bffErrorResponse(
				"Invalid refresh response from auth service",
				502
			);
		}
		console.log("ok", ok);

		await setAuthCookies(ok.data.access_token, ok.data.refresh_token);

		return NextResponse.json({
			success: true,
			message: "Token refreshed",
		} satisfies Pick<TApiResponse<never>, "success" | "message">);
	} catch (error) {
		console.log("error", error);
		return bffErrorResponse("Failed to reach authentication service", 502);
	}
}
