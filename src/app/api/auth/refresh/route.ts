import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const AppUrl = new URL(request.url);
	const cookieStore = await cookies();
	const redirect = AppUrl.searchParams.get("redirect") ?? "/dashboard";
	const refreshToken = cookieStore.get("refresh_token")?.value;

	if (!refreshToken) {
		const response = NextResponse.redirect(new URL("/login", request.url));
		response.cookies.delete("access_token");
		return response;
	}

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: `refresh_token=${refreshToken}`,
				},
				signal: AbortSignal.timeout(10000),
			}
		);

		if (!response.ok) {
			const response = NextResponse.redirect(new URL("/login", request.url));
			response.cookies.delete("access_token");
			response.cookies.delete("refresh_token");
			return response;
		}

		const backendSetCookies = response.headers.getSetCookie();
		const res = NextResponse.redirect(new URL(redirect, request.url));

		backendSetCookies.forEach(cookie =>
			res.headers.append("Set-Cookie", cookie)
		);

		return res;
	} catch (error) {
		const res = NextResponse.redirect(new URL("/login", request.url));
		res.cookies.delete("access_token");
		res.cookies.delete("refresh_token");
		return res;
	}
}
