export const getServerCookies = async () => {
  if (typeof window !== "undefined") return "";

  return import("next/headers").then(async ({ cookies }) => {
    try {
      const cookieStore = await cookies();
      return cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");
    } catch (error) {
      console.error("Failed to get server cookies", error);
      return "";
    }
  });
};
