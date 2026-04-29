import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { storeService } from "@/entities/store/api/store.service";
import { itemService } from "@/entities/item/api/item.service";
import { STORE_KEYS } from "@/entities/store/api/store.keys";
import { ITEM_KEYS } from "@/entities/item/api/item.keys";
import {
	StoreItemsView,
	TItemStoreFilters,
} from "@/features/store/components/store-front/store-items-view";
import { notFound } from "next/navigation";
import { CATEGORY_KEYS } from "@/entities/category/api/category.keys";
import { categoryService } from "@/entities/category/api/category.service";

type Props = {
	params: Promise<{ storeUrl: string }>;
	searchParams: Promise<{
		page?: string;
		limit?: string;
		category_id?: string;
		name?: string;
	}>;
};

export default async function StoreItemsPage({ params, searchParams }: Props) {
	const { storeUrl } = await params;
	const { page: pageStr, limit: limitStr, category_id, name } = await searchParams;

	const page = pageStr ? Number(pageStr) : undefined;
	const limit = limitStr ? Number(limitStr) : undefined;
	const filters: TItemStoreFilters = {
		category_id: category_id ?? undefined,
		name: name ?? undefined,
	};

	const queryClient = getQueryClient();

	try {
		await Promise.all([
			queryClient.prefetchQuery({
				queryKey: STORE_KEYS.STORE(storeUrl),
				queryFn: () => storeService.getStoreURL(storeUrl),
			}),
			queryClient.prefetchQuery({
				queryKey: ITEM_KEYS.STORE_LIST(storeUrl, { page, limit, ...filters }),
				queryFn: () =>
					itemService.getStoreItems(storeUrl, {
						page,
						limit,
						...filters,
					}),
			}),
			queryClient.prefetchQuery({
				queryKey: CATEGORY_KEYS.LIST({ page: 1, limit: 50 }),
				queryFn: () =>
					categoryService.getCategories({
						options: { params: { page: 1, limit: 50 } },
					}),
			}),
		]);
	} catch {
		notFound();
	}

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<StoreItemsView storeUrl={storeUrl} />
		</HydrationBoundary>
	);
}
