import { upstreamFetch } from "@/server/lib/upstream-fetch";
import {
	bffErrorResponse,
	messageFromUpstreamError,
} from "@/shared/lib/bff-response";
import { clearAuthCookies } from "@/shared/lib/cookies";
import { TApiResponse } from "@/shared/lib/fetcher";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
	const cookieStore = await cookies();

	const refreshToken = cookieStore.get("refresh_token")?.value;

	if (!refreshToken) {
		return bffErrorResponse("No refresh token present", 401);
	}
	try {
		const response = await upstreamFetch("/auth/logout", {
			method: "POST",
			withAuth: false,
			body: { refresh_token: refreshToken },
		});

		const payload = await response.json().catch(() => null);

		if (!response.ok) {
			return bffErrorResponse(
				messageFromUpstreamError(payload ?? {}),
				response.status,
				(payload as { detail?: unknown } | null)?.detail
			);
		}

		await clearAuthCookies();

		return NextResponse.json({
			success: true,
			message: "Logged out successfully",
		} satisfies Pick<TApiResponse<never>, "success" | "message">);
	} catch {
		return bffErrorResponse("Failed to reach authentication service", 502);
	}
}
