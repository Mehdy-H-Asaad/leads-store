// SERVER COMPONENT
import { PageHeader } from "@/shared/components/common/page-header";
import { CategoryDataTable } from "@/features/category/components/data-table/category-data-table";
import { getQueryClient } from "@/shared/lib/query-client";
import { CATEGORY_KEYS } from "@/entities/category/api/category.keys";
import { categoryService } from "@/entities/category/api/category.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { DEFAULT_PAGE_SIZE } from "@/shared/types/types";

const CategoriesDataTablePage = async ({
	searchParams,
}: {
	searchParams: Promise<{ page: string; limit: string }>;
}) => {
	const queryClient = getQueryClient();

	const { page, limit } = await searchParams;
	const parsedPage = parseInt(page ?? "1", 10);
	const parsedLimit = parseInt(limit ?? DEFAULT_PAGE_SIZE.toString(), 10);

	await queryClient.prefetchQuery({
		queryKey: CATEGORY_KEYS.LIST({
			page: parsedPage,
			limit: parsedLimit,
		}),
		queryFn: () =>
			categoryService.getCategories({
				options: {
					params: { page: parsedPage, limit: parsedLimit },
				},
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

export default CategoriesDataTablePage;
