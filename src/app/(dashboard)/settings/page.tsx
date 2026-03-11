import { SettingsScreen } from "./settings-screen";
import { PageHeader } from "@/shared/components/common/page-header";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Suspense } from "react";

const page = async () => {
	return (
		<div className="flex flex-col gap-8">
			<PageHeader
				title="Settings"
				description="Manage your business profile and store"
			/>
			<Suspense fallback={<Skeleton className="w-full h-screen" />}>
				<SettingsScreen />
			</Suspense>
		</div>
	);
};

export default page;
