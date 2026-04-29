import { PageHeader } from "@/shared/components/common/page-header";
import { OrderDataTable } from "@/features/order/components/data-table/order-data-table";
import { getQueryClient } from "@/shared/lib/query-client";
import { ORDER_KEYS } from "@/entities/order/api/order.keys";
import { orderService } from "@/entities/order/api/order.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const page = async () => {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ORDER_KEYS.LIST({ page: 1, limit: 10 }),
		queryFn: () =>
			orderService.getOrders({ options: { params: { page: 1, limit: 10 } } }),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="flex flex-col gap-8">
			<PageHeader title="Orders" description="Manage your store orders" />
			<HydrationBoundary state={dehydratedState}>
				<OrderDataTable />
			</HydrationBoundary>
		</div>
	);
};

export default page;
