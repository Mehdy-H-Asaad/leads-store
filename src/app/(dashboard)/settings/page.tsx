import { PageHeader } from "@/shared/components/common/page-header";
import { SettingsContent } from "@/entities/user/components/settings-content";

const page = () => {
	return (
		<div className="flex flex-col gap-8">
			<PageHeader
				title="Settings"
				description="Manage your business profile and store"
			/>
			<SettingsContent />
		</div>
	);
};

export default page;
