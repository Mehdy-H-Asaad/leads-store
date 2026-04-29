"use client";
import { SettingsContent } from "@/features/user/components/settings/settings-content";
import { useLogout } from "@/features/auth/hooks/use-logout";

export const SettingsScreen = () => {
	const { isLogoutPending, onLogout } = useLogout();
	return (
		<SettingsContent isLogoutPending={isLogoutPending} onLogout={onLogout} />
	);
};
