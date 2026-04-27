import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { customizationService } from "@/entities/customization/api/customization.service";
import { itemService } from "@/entities/item/api/item.service";
import { CUSTOMIZATION_KEYS } from "@/entities/customization/api/customization.keys";
import { ITEM_KEYS } from "@/entities/item/api/item.keys";
import { StoreItemDetail } from "@/features/storefront/components/store-item-detail";
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
				queryKey: CUSTOMIZATION_KEYS.STORE(storeUrl),
				queryFn: () => customizationService.getStoreURL(storeUrl),
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
