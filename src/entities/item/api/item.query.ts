import {
	useApiQuery,
	useApiPaginatedQuery,
} from "@/shared/hooks/use-api-query";
import { ITEM_KEYS } from "./item.keys";
import { TItem } from "../model/item.model";
import { TItemFilters } from "../model/item.types";
import { TApiResponse } from "@/shared/lib/fetcher";
import { itemService } from "./item.service";

type TUseGetItemsProps = {
	page?: number;
	limit?: number;
	filters?: TItemFilters;
};

export const useGetItems = ({ page, limit, filters }: TUseGetItemsProps) => {
	const { data, totalRows, totalPages, isFetching, error } =
		useApiPaginatedQuery<TItem>({
			queryKey: ITEM_KEYS.LIST({ page, limit, ...filters }),
			queryFn: () =>
				itemService.getItems({
					options: { params: { page, limit, ...filters } },
				}),
		});

	return {
		items: data,
		totalRows,
		totalPages,
		isGettingItems: isFetching,
		error,
	};
};

export const useGetItem = ({ id }: { id: string }) => {
	const { data, isLoading, error } = useApiQuery<TApiResponse<TItem>>({
		queryKey: ITEM_KEYS.DETAIL(id),
		queryFn: () => itemService.getItem(id),
		enabled: !!id,
	});

	return {
		item: data?.data ?? null,
		isGettingItem: isLoading,
		error,
	};
};
