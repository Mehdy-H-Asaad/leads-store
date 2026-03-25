import { useApiQuery } from "@/shared/hooks/use-api-query";
import { ITEM_KEYS } from "./item.keys";
import { TItem } from "../model/item.model";
import { TApiResponse, TPaginatedApiResponse } from "@/shared/lib/fetcher";
import { itemService } from "./item.service";

type TUseGetItemsProps = {
	page?: number;
	limit?: number;
};

export const useGetItems = ({ page, limit }: TUseGetItemsProps) => {
	const { data, isFetching, error } = useApiQuery<TPaginatedApiResponse<TItem>>(
		{
			queryKey: ITEM_KEYS.LISTS(),
			queryFn: () =>
				itemService.getItems({ options: { params: { page, limit } } }),
		}
	);

	return {
		items: data?.data ?? [],
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
