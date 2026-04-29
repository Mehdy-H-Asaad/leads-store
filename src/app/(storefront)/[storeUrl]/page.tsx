import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { storeService } from "@/entities/store/api/store.service";
import { STORE_KEYS } from "@/entities/store/api/store.keys";
import { StoreProfile } from "@/features/store/components/store-front/store-profile";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { itemService } from "@/entities/item/api/item.service";
import { ITEM_KEYS } from "@/entities/item/api/item.keys";

type Props = {
	params: Promise<{ storeUrl: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const { storeUrl } = await params;
		const response = await storeService.getStoreURL(storeUrl);
		const store = response.data;
		return {
			title: store.config?.profile?.title,
			description:
				store.config?.profile?.bio ??
				`Visit ${store.config?.profile?.title}'s store`,
			openGraph: {
				title: store.config?.profile?.title,
				description: store.config?.profile?.bio,
				images: store.logo?.url ? [{ url: store.logo?.url }] : [],
			},
		};
	} catch {
		return { title: "Store" };
	}
}

export default async function StorePage({ params }: Props) {
	const { storeUrl } = await params;
	const queryClient = getQueryClient();

	try {
		await Promise.all([
			queryClient.prefetchQuery({
				queryKey: STORE_KEYS.STORE(storeUrl),
				queryFn: () => storeService.getStoreURL(storeUrl),
			}),
			queryClient.prefetchQuery({
				queryKey: ITEM_KEYS.STORE_LIST(storeUrl, { page: 1, limit: 4 }),
				queryFn: () =>
					itemService.getStoreItems(storeUrl, { page: 1, limit: 4 }),
			}),
		]);
	} catch {
		notFound();
	}

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<StoreProfile storeUrl={storeUrl} />
		</HydrationBoundary>
	);
}
