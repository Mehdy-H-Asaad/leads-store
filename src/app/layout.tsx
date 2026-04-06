import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/providers/auth-provider";
import { TanstackProvider } from "@/app/providers/tanstack-provider";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { USER_KEYS } from "@/entities/user/api/user.key";
import { userService } from "@/entities/user/api/user.service";
import { getQueryClient } from "@/shared/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata: Metadata = {
	title: "Store Link",
	description: "Store Link - A platform for creating and managing your store",
};

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = await cookies();
	const hasSession = !!cookieStore.get("refresh_token")?.value;
	const queryClient = getQueryClient();

	if (hasSession) {
		await queryClient.prefetchQuery({
			queryKey: USER_KEYS.ME(),
			queryFn: () => userService.getMe(),
		});
	}
	const dehydratedState = dehydrate(queryClient);
	return (
		<html lang="en">
			<body className={`${poppins.variable} ${poppins.className} antialiased`}>
				<TanstackProvider>
					<HydrationBoundary state={dehydratedState}>
						{children}
					</HydrationBoundary>
				</TanstackProvider>
				<Toaster position="top-right" richColors />
			</body>
		</html>
	);
}
