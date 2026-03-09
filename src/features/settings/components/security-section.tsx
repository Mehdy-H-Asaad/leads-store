"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

export const SecuritySection = () => {
	const handleChangePassword = () => {
		// TODO: Navigate to change password or open modal
	};

	return (
		<Card className="rounded-xl border bg-card shadow-sm">
			<CardHeader>
				<CardTitle>Security</CardTitle>
				<CardDescription>Manage your account security</CardDescription>
			</CardHeader>
			<CardContent>
				<Button variant="outline" onClick={handleChangePassword}>
					Change Password
				</Button>
			</CardContent>
		</Card>
	);
};
