import { Suspense } from "react";
import { ConfirmEmailChange } from "@/features/user/components/settings/confirm-email-change";

const page = () => {
	return (
		<Suspense>
			<ConfirmEmailChange />
		</Suspense>
	);
};

export default page;
