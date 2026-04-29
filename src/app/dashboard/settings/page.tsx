import { SettingsScreen } from "./settings-screen";
import { PageHeader } from "@/shared/components/common/page-header";

const page = async () => {
	return (
		<div className="flex flex-col gap-8">
			<PageHeader
				title="Settings"
				description="Manage your business profile and store"
			/>
			<SettingsScreen />
		</div>
	);
};

export default page;
