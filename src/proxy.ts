// import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
const AUTH_ROUTES = ["/login", "/signup", "/user-onboarding"];

export async function proxy(request: NextRequest) {
	const refreshToken = request.cookies.get("refresh_token")?.value;
	const pathname = request.nextUrl.pathname;

	const isAuthRoute = AUTH_ROUTES.some(r => pathname.startsWith(r));
	if (refreshToken && isAuthRoute) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

// const PROTECTED_ROUTES = ["/", "/companies"];

// function isProtectedRoute(pathname: string): boolean {
// 	return PROTECTED_ROUTES.some(
// 		route => pathname === route || pathname.startsWith(`${route}/`)
// 	);
// }

// async function validateAccessToken(
// 	accessToken: string
// ): Promise<{ valid: boolean; expiringSoon: boolean }> {
// 	try {
// 		const { payload } = await jwtVerify(
// 			accessToken,
// 			new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!)
// 		);

// 		const exp = payload.exp as number;
// 		const now = Math.floor(Date.now() / 1000);

// 		if (exp <= now) {
// 			return { valid: false, expiringSoon: false };
// 		}

// 		const expiringSoon = exp - now < 300;

// 		return { valid: true, expiringSoon };
// 	} catch {
// 		return { valid: false, expiringSoon: false };
// 	}
// }

// function buildRefreshRedirect(request: NextRequest): URL {
// 	const redirectPath = request.nextUrl.pathname + request.nextUrl.search;
// 	return new URL(
// 		`/api/auth/refresh?redirect=${encodeURIComponent(redirectPath)}`,
// 		request.url
// 	);
// }

// export async function proxy(request: NextRequest) {
// 	const refreshToken = request.cookies.get("refresh_token")?.value;
// 	const accessToken = request.cookies.get("access_token")?.value;
// 	const pathname = request.nextUrl.pathname;
// 	const isProtected = isProtectedRoute(pathname);

// 	// NO REFRESH TOKEN REDIRECT TO LOGIN IF PROTECTED
// 	if (!refreshToken) {
// 		if (isProtected) {
// 			const response = NextResponse.redirect(new URL("/login", request.url));
// 			response.cookies.delete("access_token");
// 			return response;
// 		}

// 		return NextResponse.next();
// 	}

// 	// NO ACCESS TOKEN REDIRECT TO REFRESH IF PROTECTED
// 	if (isProtected) {
// 		if (!accessToken) {
// 			return NextResponse.redirect(buildRefreshRedirect(request));
// 		}

// 		const { valid, expiringSoon } = await validateAccessToken(accessToken);

// 		if (!valid || expiringSoon) {
// 			return NextResponse.redirect(buildRefreshRedirect(request));
// 		}

// 		return NextResponse.next();
// 	}

// 	// NO ACCESS TOKEN REDIRECT TO REFRESH IF PUBLIC
// 	if (!accessToken) {
// 		// Has refresh token but no access token - refresh to get user data
// 		return NextResponse.redirect(buildRefreshRedirect(request));
// 	}

// 	// Has both tokens - allow access (skip JWT verification for speed)
// 	// If the token is actually invalid, the API call will fail and
// 	// user will need to refresh the page (acceptable trade-off for public routes)
// 	return NextResponse.next();
// }

// export const config = {
// 	matcher:
// 		"/((?!login|signup|verify-email|api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|\\.well-known).*)",
// };
