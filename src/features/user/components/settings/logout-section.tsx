"use client";

import { Button } from "@/shared/components/ui/button";
import { LogOut } from "lucide-react";

export const LogoutSection = ({
	isLogoutPending,
	onLogout,
}: {
	isLogoutPending: boolean;
	onLogout: () => void;
}) => {
	return (
		<div className="pt-2">
			<Button
				variant="link"
				className="text-destructive bg-red-50 hover:bg-red-100  h-auto font-medium"
				onClick={onLogout}
				disabled={isLogoutPending}
			>
				<LogOut className="mr-2 size-4" />
				Log Out
			</Button>
		</div>
	);
};
