import { PageHeader } from "@/shared/components/common/page-header";
import { AnalyticsContent } from "@/features/analytics/components/analytics-content";
import { getQueryClient } from "@/shared/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ANALYTICS_KEYS } from "@/entities/analytics/api/analytics.keys";
import { analyticsService } from "@/entities/analytics/api/analytics.service";

const page = async () => {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ANALYTICS_KEYS.OVERVIEW(),
		queryFn: () => analyticsService.getOverview(),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="flex flex-col gap-8">
			<PageHeader
				title="Analytics"
				description="Track revenue and performance"
			/>
			<HydrationBoundary state={dehydratedState}>
				<AnalyticsContent />
			</HydrationBoundary>
		</div>
	);
};

export default page;
