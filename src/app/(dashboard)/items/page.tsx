import { PageHeader } from "@/shared/components/common/page-header";
import { ItemDataTable } from "@/features/item/components/data-table/item-data-table";
import { getQueryClient } from "@/shared/lib/query-client";
import { ITEM_KEYS } from "@/entities/item/api/item.keys";
import { itemService } from "@/entities/item/api/item.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const page = async () => {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ITEM_KEYS.LISTS(),
		queryFn: () =>
			itemService.getItems({ options: { params: { page: 1, limit: 10 } } }),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="flex flex-col gap-8">
			<PageHeader title="Items" description="Manage your item catalog" />
			<HydrationBoundary state={dehydratedState}>
				<ItemDataTable />
			</HydrationBoundary>
		</div>
	);
};

export default page;
