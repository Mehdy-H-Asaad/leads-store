import { Suspense } from "react";
import { ConfirmEmailChange } from "@/features/auth/components/confirm-email-change";

const page = () => {
	return (
		<Suspense>
			<ConfirmEmailChange />
		</Suspense>
	);
};

export default page;
