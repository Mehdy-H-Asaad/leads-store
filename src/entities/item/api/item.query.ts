import {
	useApiQuery,
	useApiPaginatedQuery,
} from "@/shared/hooks/use-api-query";
import { ITEM_KEYS } from "./item.keys";
import { TItem, TStoreItem } from "../model/item.model";
import { TItemFilters } from "../model/item.types";
import { TApiResponse } from "@/shared/lib/fetcher";
import { itemService } from "./item.service";

type TUseGetItemsProps = {
	page?: number;
	limit?: number;
	filters?: TItemFilters;
};

type TUseGetStoreItemsProps = {
	storeUrl: string;
	page?: number;
	limit?: number;
	filters?: TItemFilters;
};

type TUseGetStoreItemBySlugProps = {
	storeUrl: string;
	slug: string;
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

export const useGetStoreItems = ({
	storeUrl,
	page,
	limit,
	filters,
}: TUseGetStoreItemsProps) => {
	const { data, totalRows, totalPages, isFetching, error } =
		useApiPaginatedQuery<TStoreItem>({
			queryKey: ITEM_KEYS.LIST({ page, limit, ...filters }),
			queryFn: () =>
				itemService.getStoreItems(storeUrl, { page, limit, ...filters }),
		});

	return {
		items: data,
		totalRows,
		totalPages,
		isGettingItems: isFetching,
		error,
	};
};

export const useGetStoreItemBySlug = ({
	storeUrl,
	slug,
}: TUseGetStoreItemBySlugProps) => {
	const { data, isLoading, error } = useApiQuery<TApiResponse<TStoreItem>>({
		queryKey: ITEM_KEYS.DETAIL(`${storeUrl}-${slug}`),
		queryFn: () => itemService.getStoreItemBySlug(storeUrl, slug),
		enabled: !!storeUrl && !!slug,
	});

	return {
		item: data?.data ?? null,
		isGettingItem: isLoading,
		error,
	};
};
