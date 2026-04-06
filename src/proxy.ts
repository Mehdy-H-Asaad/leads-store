// proxy.ts
import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/signup"];

export function proxy(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	const refresh = req.cookies.get("refresh_token")?.value;
	const access = req.cookies.get("access_token")?.value;

	const isAuthRoute = AUTH_ROUTES.some(r => pathname.startsWith(r));

	if (!refresh && pathname.startsWith("/") && !isAuthRoute) {
		const response = NextResponse.redirect(new URL("/login", req.url));
		response.cookies.delete("access_token");
		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|\\.well-known).*)",
	],
};
