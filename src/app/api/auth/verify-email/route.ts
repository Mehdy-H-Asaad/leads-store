import { upstreamFetch } from "@/server/lib/upstream-fetch";
import {
	bffErrorResponse,
	messageFromUpstreamError,
} from "@/shared/lib/bff-response";
import { TApiResponse } from "@/shared/lib/fetcher";
import { verifyOtpDtoSchema } from "@/features/auth/api/auth.dto";
import { NextRequest, NextResponse } from "next/server";
import { TUpstreamVerifyEmailResponseDTO } from "@/server/types/auth.server-dto";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const cookieStore = await cookies();
	const parsed = verifyOtpDtoSchema.safeParse(body);
	if (!parsed.success) {
		return bffErrorResponse(
			"Invalid request body",
			400,
			parsed.error.flatten()
		);
	}

	try {
		const response = await upstreamFetch("/auth/verify-email", {
			method: "POST",
			withAuth: false,
			body: parsed.data,
		});

		const payload = await response.json().catch(() => null);

		if (!response.ok) {
			return bffErrorResponse(
				messageFromUpstreamError(payload ?? {}),
				response.status,
				(payload as { detail?: unknown } | null)?.detail
			);
		}

		const ok = payload as TApiResponse<TUpstreamVerifyEmailResponseDTO>;
		cookieStore.set("sign_up_complete_token", ok.data.sign_up_complete_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24 * 1, // 1 day
		});

		return NextResponse.json({
			success: true,
			message: "Email verified successfully",
			data: ok.data.user,
		} satisfies TApiResponse<TUpstreamVerifyEmailResponseDTO["user"]>);
	} catch {
		return bffErrorResponse("Failed to reach authentication service", 502);
	}
}
