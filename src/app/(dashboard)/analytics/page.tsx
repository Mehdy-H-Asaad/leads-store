import { PageHeader } from "@/shared/components/common/page-header";
import { AnalyticsContent } from "@/features/analytics/components/analytics-content";

const page = () => {
	return (
		<div className="flex flex-col gap-8">
			<PageHeader
				title="Analytics"
				description="Track revenue and performance"
			/>
			<AnalyticsContent />
		</div>
	);
};

export default page;
