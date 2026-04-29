import { PageHeader } from "@/shared/components/common/page-header";
import { OverviewContent } from "@/features/dashboard/components/overview/overview-content";
import { getQueryClient } from "@/shared/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ANALYTICS_KEYS } from "@/entities/analytics/api/analytics.keys";
import { analyticsService } from "@/entities/analytics/api/analytics.service";
import { ORDER_KEYS } from "@/entities/order/api/order.keys";
import { orderService } from "@/entities/order/api/order.service";

const page = async () => {
	const queryClient = getQueryClient();

	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: ANALYTICS_KEYS.OVERVIEW(),
			queryFn: () => analyticsService.getOverview(),
		}),
		queryClient.prefetchQuery({
			queryKey: ORDER_KEYS.LIST({ page: 1, limit: 5 }),
			queryFn: () =>
				orderService.getOrders({ options: { params: { page: 1, limit: 5 } } }),
		}),
	]);

	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="flex flex-col gap-8">
			<PageHeader
				title="Dashboard"
				description="Welcome back — here's what's happening in your store"
			/>
			<HydrationBoundary state={dehydratedState}>
				<OverviewContent />
			</HydrationBoundary>
		</div>
	);
};

export default page;
