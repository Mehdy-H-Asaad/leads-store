"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { ChangeEmailDialog } from "./change-email-dialog";

export const SecuritySection = () => {
	return (
		<Card className="rounded-xl border bg-card shadow-sm">
			<CardHeader>
				<CardTitle>Security</CardTitle>
				<CardDescription>Manage your account security</CardDescription>
			</CardHeader>
			<CardContent className="flex gap-4">
				<Button variant="outline" asChild>
					<Link href="/forgot-password">Change Password</Link>
				</Button>
				<ChangeEmailDialog />
			</CardContent>
		</Card>
	);
};
