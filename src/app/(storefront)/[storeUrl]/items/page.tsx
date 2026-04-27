import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { customizationService } from "@/entities/customization/api/customization.service";
import { itemService } from "@/entities/item/api/item.service";
import { CUSTOMIZATION_KEYS } from "@/entities/customization/api/customization.keys";
import { ITEM_KEYS } from "@/entities/item/api/item.keys";
import { StoreItemsView } from "@/features/storefront/components/store-items-view";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ storeUrl: string }>;
};

export default async function StoreItemsPage({ params }: Props) {
	const { storeUrl } = await params;
	const queryClient = getQueryClient();

	try {
		await Promise.all([
			queryClient.prefetchQuery({
				queryKey: CUSTOMIZATION_KEYS.STORE(storeUrl),
				queryFn: () => customizationService.getStoreURL(storeUrl),
			}),
			queryClient.prefetchQuery({
				queryKey: ITEM_KEYS.STORE_LIST(storeUrl),
				queryFn: () => itemService.getStoreItems(storeUrl, { limit: 50 }),
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
