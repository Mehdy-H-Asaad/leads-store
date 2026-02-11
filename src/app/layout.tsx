import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { TanstackProvider } from "@/providers/tanstack-provider";
import { Toaster } from "sonner";
import { cookies } from "next/headers";

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
	const hasSession = !!cookieStore.get("access_token")?.value;
	return (
		<html lang="en">
			<body className={`${poppins.variable} ${poppins.className} antialiased`}>
				<TanstackProvider>
					<AuthProvider hasSession={hasSession}>
						{children}
						<Toaster position="top-right" richColors />
					</AuthProvider>
				</TanstackProvider>
			</body>
		</html>
	);
}
