import { PageHeader } from "@/shared/components/common/page-header";
import { StoreBuilder } from "@/features/store/components/builder/store-builder";
import { getQueryClient } from "@/shared/lib/query-client";
import { STORE_KEYS } from "@/entities/store/api/store.keys";
import { storeService } from "@/entities/store/api/store.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { StoreBuilderSkeleton } from "@/features/store/components/builder/store-skeleton";

const StorePage = async () => {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: STORE_KEYS.ME,
		queryFn: () => storeService.getMyStore(),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="flex flex-col gap-6">
			<PageHeader
				title="Store Builder"
				description="Build your public page — customize links, theme, and layout"
			/>
			<HydrationBoundary state={dehydratedState}>
				<Suspense fallback={<StoreBuilderSkeleton />}>
					<StoreBuilder />
				</Suspense>
			</HydrationBoundary>
		</div>
	);
};

export default StorePage;
