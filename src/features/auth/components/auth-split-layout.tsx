"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

type AuthSplitLayoutProps = {
	children: ReactNode;
	variant: "login" | "signup";
};

const copy = {
	login: {
		cta: "Not a member?",
		ctaLink: "Register now",
		ctaHref: "/signup",
	},
	signup: {
		cta: "Already have an account?",
		ctaLink: "Sign in",
		ctaHref: "/login",
	},
};

export function AuthSplitLayout({ children, variant }: AuthSplitLayoutProps) {
	const { cta, ctaLink, ctaHref } = copy[variant];

	return (
		<div className="min-h-screen flex bg-background">
			<div className="w-full lg:w-[50%] flex items-center justify-center py-12 px-6 lg:px-14">
				<div className="w-full max-w-[400px]">
					{children}
					<p className="mt-6 text-sm text-muted-foreground text-center">
						{cta}{" "}
						<Link
							href={ctaHref}
							className="font-medium text-[#15803d] hover:text-[#166534] hover:underline underline-offset-2"
						>
							{ctaLink}
						</Link>
					</p>
				</div>
			</div>

			<div className="hidden lg:flex lg:w-[50%] bg-green-300/10 flex-col items-center justify-center py-12 px-10 border-l border-border">
				<Image
					width={380}
					height={380}
					src="https://illustrations.popsy.co/green/remote-work.svg"
					alt="Person working illustration"
					className="w-full max-w-[500px]"
				/>
				<p className="text-center text-sm text-neutral-700 mt-8 max-w-[280px]">
					Make your work easier and organized with our platform.
				</p>
			</div>
		</div>
	);
}
