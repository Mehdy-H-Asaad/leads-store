import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { storeService } from "@/entities/store/api/store.service";
import { itemService } from "@/entities/item/api/item.service";
import { STORE_KEYS } from "@/entities/store/api/store.keys";
import { ITEM_KEYS } from "@/entities/item/api/item.keys";
import { StoreItemDetail } from "@/features/store/components/store-front/store-item-detail";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ storeUrl: string; slug: string }>;
};

export default async function StoreItemSlugPage({ params }: Props) {
	const { storeUrl, slug } = await params;
	const queryClient = getQueryClient();

	try {
		await Promise.all([
			queryClient.prefetchQuery({
				queryKey: STORE_KEYS.STORE(storeUrl),
				queryFn: () => storeService.getStoreURL(storeUrl),
			}),
			queryClient.prefetchQuery({
				queryKey: ITEM_KEYS.STORE_DETAIL(storeUrl, slug),
				queryFn: () => itemService.getStoreItemBySlug(storeUrl, slug),
			}),
		]);
	} catch {
		notFound();
	}

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<StoreItemDetail storeUrl={storeUrl} slug={slug} />
		</HydrationBoundary>
	);
}
