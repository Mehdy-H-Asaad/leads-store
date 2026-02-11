"use client";

import { useGetMe } from "@/features/user/hooks/use-get-me";

export const AuthProvider = ({
	hasSession,
	children,
}: {
	hasSession: boolean;
	children: React.ReactNode;
}) => {
	useGetMe({ enabled: hasSession });
	return <>{children}</>;
};
