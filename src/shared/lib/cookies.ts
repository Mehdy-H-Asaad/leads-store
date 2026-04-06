import { cookies } from "next/headers";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export async function setAuthCookies(access: string, refresh: string) {
	const cookieStore = await cookies();

	cookieStore.set(ACCESS_TOKEN, access, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 15, // 15 min
	});

	cookieStore.set(REFRESH_TOKEN, refresh, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 7, // 7 days
	});
}

export async function getAccessToken() {
	const cookieStore = await cookies();
	return cookieStore.get(ACCESS_TOKEN)?.value;
}

export async function getRefreshToken() {
	const cookieStore = await cookies();
	return cookieStore.get(REFRESH_TOKEN)?.value;
}

export async function clearAuthCookies() {
	const cookieStore = await cookies();
	cookieStore.delete(ACCESS_TOKEN);
	cookieStore.delete(REFRESH_TOKEN);
}
