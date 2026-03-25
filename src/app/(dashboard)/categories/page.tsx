import { PageHeader } from "@/shared/components/common/page-header";
import { CategoryDataTable } from "@/features/category/components/data-table/category-data-table";
import { getQueryClient } from "@/shared/lib/query-client";
import { CATEGORY_KEYS } from "@/entities/category/api/category.keys";
import { categoryService } from "@/entities/category/api/category.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const page = async () => {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: CATEGORY_KEYS.LIST({ page: 1, limit: 10 }),
		queryFn: () =>
			categoryService.getCategories({
				options: { params: { page: 1, limit: 10 } },
			}),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="flex flex-col gap-8">
			<PageHeader
				title="Categories"
				description="Manage your item categories"
			/>
			<HydrationBoundary state={dehydratedState}>
				<CategoryDataTable />
			</HydrationBoundary>
		</div>
	);
};

export default page;
