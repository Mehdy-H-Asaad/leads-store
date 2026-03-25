export const getServerCookies = async () => {
	if (typeof window !== "undefined") return "";

	const { cookies } = await import("next/headers");
	const cookieStore = await cookies();
	return cookieStore
		.getAll()
		.map(cookie => `${cookie.name}=${cookie.value}`)
		.join("; ");
};
