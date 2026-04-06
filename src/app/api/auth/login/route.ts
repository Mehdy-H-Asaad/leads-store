import type { TUpstreamLoginDataDTO } from "@/server/types/auth.server-dto";
import { upstreamFetch } from "@/server/lib/upstream-fetch";
import { setAuthCookies } from "@/shared/lib/cookies";
import { bffErrorResponse, messageFromUpstreamError } from "@/shared/lib/bff-response";
import type { TApiResponse } from "@/shared/lib/fetcher";
import { loginDtoSchema } from "@/features/auth/api/auth.dto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const rawBody = await request.json().catch(() => null);

	const parsed = loginDtoSchema.safeParse(rawBody);
	if (!parsed.success) {
		return bffErrorResponse("Invalid request body", 400, parsed.error.flatten());
	}

	try {
		const response = await upstreamFetch("/auth/login", {
			method: "POST",
			body: parsed.data,
			withAuth: false,
		});

		const payload = await response.json().catch(() => null);

		if (!response.ok) {
			return bffErrorResponse(
				messageFromUpstreamError(payload ?? {}),
				response.status,
				(payload as { detail?: unknown } | null)?.detail
			);
		}

		const ok = payload as TApiResponse<TUpstreamLoginDataDTO>;
		await setAuthCookies(ok.data.access_token, ok.data.refresh_token);

		return NextResponse.json({
			success: true,
			message: ok.message ?? "",
			data: ok.data.user,
		} satisfies TApiResponse<TUpstreamLoginDataDTO["user"]>);
	} catch {
		return bffErrorResponse("Failed to reach authentication service", 502);
	}
}
