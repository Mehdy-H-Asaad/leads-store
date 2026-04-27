import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { customizationService } from "@/entities/customization/api/customization.service";
import { CUSTOMIZATION_KEYS } from "@/entities/customization/api/customization.keys";
import { StoreProfile } from "@/features/storefront/components/store-profile";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
	params: Promise<{ storeUrl: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const { storeUrl } = await params;
		const response = await customizationService.getStoreURL(storeUrl);
		const store = response.data;
		return {
			title: store.config.profile.title,
			description:
				store.config.profile.bio ??
				`Visit ${store.config.profile.title}'s store`,
			openGraph: {
				title: store.config.profile.title,
				description: store.config.profile.bio,
				images: store.logo?.url ? [{ url: store.logo.url }] : [],
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
		await queryClient.prefetchQuery({
			queryKey: CUSTOMIZATION_KEYS.STORE(storeUrl),
			queryFn: () => customizationService.getStoreURL(storeUrl),
		});
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
