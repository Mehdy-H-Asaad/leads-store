import {
	useApiQuery,
	useApiPaginatedQuery,
} from "@/shared/hooks/use-api-query";
import { CATEGORY_KEYS } from "./category.keys";
import { TCategory } from "../model/category.model";
import { TApiResponse } from "@/shared/lib/fetcher";
import { categoryService } from "./category.service";

type TUseGetCategoriesProps = {
	page?: number;
	limit?: number;
	filters?: { name?: string };
};

export const useGetCategories = ({
	page,
	limit,
	filters,
}: TUseGetCategoriesProps) => {
	const { data, totalRows, totalPages, isFetching, error } =
		useApiPaginatedQuery<TCategory>({
			queryKey: CATEGORY_KEYS.LIST({ page, limit, ...filters }),
			queryFn: () =>
				categoryService.getCategories({
					options: { params: { page, limit, ...filters } },
				}),
		});

	return {
		categories: data,
		totalRows,
		totalPages,
		isGettingCategories: isFetching,
		error,
	};
};

export const useGetCategory = ({ id }: { id: string }) => {
	const { data, isLoading, error } = useApiQuery<TApiResponse<TCategory>>({
		queryKey: CATEGORY_KEYS.DETAIL(id),
		queryFn: () => categoryService.getCategory(id),
		enabled: !!id,
	});

	return {
		category: data?.data ?? null,
		isGettingCategory: isLoading,
		error,
	};
};
