import { upstreamFetch } from "@/server/lib/upstream-fetch";
import { setAuthCookies } from "@/shared/lib/cookies";
import {
	bffErrorResponse,
	messageFromUpstreamError,
} from "@/shared/lib/bff-response";
import type { TApiResponse } from "@/shared/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";
import { onboardingSchemaDto, TUserDTO } from "@/entities/user/api/user.dto";
import { cookies } from "next/headers";
import { TUpstreamCompleteOnboardingResponseDTO } from "@/server/types/user.server-dto";

export async function POST(request: NextRequest) {
	const rawBody = await request.json().catch(() => null);
	const cookieStore = await cookies();
	const signUpCompleteToken = cookieStore.get("sign_up_complete_token")?.value;
	if (!signUpCompleteToken) {
		return bffErrorResponse("Sign up complete token not found", 401);
	}

	const parsed = onboardingSchemaDto.safeParse(rawBody);
	if (!parsed.success) {
		return bffErrorResponse(
			"Invalid request body",
			400,
			parsed.error.flatten()
		);
	}

	try {
		const response = await upstreamFetch("/users/signup/complete", {
			method: "POST",
			body: parsed.data,
			headers: {
				Authorization: `Bearer ${signUpCompleteToken}`,
			},
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

		const ok = payload as TApiResponse<TUpstreamCompleteOnboardingResponseDTO>;
		setAuthCookies(ok.data.access_token, ok.data.refresh_token);
		cookieStore.delete("sign_up_complete_token");

		return NextResponse.json({
			success: true,
			message: ok.message ?? "",
			data: ok.data.user,
		} satisfies TApiResponse<TUserDTO>);
	} catch {
		return bffErrorResponse("Failed to reach authentication service", 502);
	}
}
