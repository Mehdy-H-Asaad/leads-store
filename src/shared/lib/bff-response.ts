import { NextResponse } from "next/server";

/** JSON body for failed BFF routes; matches what `fetcher` / `useApiMutation` expect. */
export type TBffErrorBody = {
	message: string;
	detail?: unknown;
};

export function bffErrorResponse(
	message: string,
	status: number,
	detail?: unknown
): NextResponse<TBffErrorBody> {
	const body: TBffErrorBody =
		detail !== undefined ? { message, detail } : { message };
	return NextResponse.json(body, { status });
}

/** FastAPI often returns `{ "detail": "..." }` or `{ "detail": [...] }` without `message`. */
export function messageFromUpstreamError(body: {
	message?: string;
	detail?: unknown;
}): string {
	if (typeof body.message === "string" && body.message.length > 0) {
		return body.message;
	}
	if (typeof body.detail === "string") {
		return body.detail;
	}
	return "Request failed";
}
