import { PageHeader } from "@/shared/components/common/page-header";
import { CustomerDataTable } from "@/features/customer/components/data-table/customer-data-table";
import { getQueryClient } from "@/shared/lib/query-client";
import { CUSTOMER_KEYS } from "@/entities/customer/api/customer.keys";
import { customerService } from "@/entities/customer/api/customer.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const page = async () => {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: CUSTOMER_KEYS.LIST({ page: 1, limit: 10 }),
		queryFn: () =>
			customerService.getCustomers({
				options: { params: { page: 1, limit: 10 } },
			}),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="flex flex-col gap-8">
			<PageHeader title="Customers" description="Manage your customers" />
			<HydrationBoundary state={dehydratedState}>
				<CustomerDataTable />
			</HydrationBoundary>
		</div>
	);
};

export default page;
