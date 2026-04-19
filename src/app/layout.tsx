import type { Metadata } from "next";
import {
	Poppins,
	Inter,
	Roboto,
	Montserrat,
	Rubik,
	Archivo_Black,
	Lato,
} from "next/font/google";
import "./globals.css";
// import { AuthProvider } from "@/app/providers/auth-provider";
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

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-inter",
});

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-roboto",
});

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["500", "600", "700"],
	variable: "--font-montserrat",
});

const rubik = Rubik({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-rubik",
});

const archivoBlack = Archivo_Black({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-archivo-black",
});

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
});

const lato = Lato({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-lato",
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
			<body
				className={`${inter.variable} ${roboto.variable} ${poppins.variable} ${montserrat.variable} ${rubik.variable} ${archivoBlack.variable} ${lato.variable} ${poppins.className} antialiased`}
			>
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
