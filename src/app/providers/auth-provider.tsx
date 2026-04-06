"use client";

import { useGetMe } from "@/entities/user/api/user.query";

export const AuthProvider = ({
	hasSession,
	children,
}: {
	hasSession: boolean;
	children: React.ReactNode;
}) => {
	const {} = useGetMe({ enabled: hasSession });

	return <>{children}</>;
};
