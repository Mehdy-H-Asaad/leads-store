"use client";

import { useLogout } from "@/features/auth/hooks/use-logout";
import { Button } from "@/shared/components/ui/button";
import { LogOut } from "lucide-react";

export const LogoutSection = () => {
	const { onLogout, isLogoutPending } = useLogout();

	return (
		<div className="pt-2">
			<Button
				variant="link"
				className="text-destructive hover:text-destructive/90 p-0 h-auto font-medium"
				onClick={onLogout}
				disabled={isLogoutPending}
			>
				<LogOut className="mr-2 size-4" />
				Log Out
			</Button>
		</div>
	);
};
