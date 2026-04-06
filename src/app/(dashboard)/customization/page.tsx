import { PageHeader } from "@/shared/components/common/page-header";
import { CustomizationBuilder } from "@/features/customization/components/builder/customization-builder";
import { getQueryClient } from "@/shared/lib/query-client";
import { CUSTOMIZATION_KEYS } from "@/entities/customization/api/customization.keys";
import { customizationService } from "@/entities/customization/api/customization.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { CustomizationBuilderSkeleton } from "@/features/customization/components/builder/customization-skeletion";

const CustomizationPage = async () => {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: CUSTOMIZATION_KEYS.ME,
		queryFn: () => customizationService.getMyCustomization(),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="flex flex-col gap-6">
			<PageHeader
				title="Customization"
				description="Build your public page — customize links, theme, and layout"
			/>
			<HydrationBoundary state={dehydratedState}>
				<Suspense fallback={<CustomizationBuilderSkeleton />}>
					<CustomizationBuilder />
				</Suspense>
			</HydrationBoundary>
		</div>
	);
};

export default CustomizationPage;
