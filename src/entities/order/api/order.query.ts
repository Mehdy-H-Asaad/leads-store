import {
	useApiQuery,
	useApiPaginatedQuery,
} from "@/shared/hooks/use-api-query";
import { ORDER_KEYS } from "./order.keys";
import { TOrder } from "../model/order.model";
import { TOrderFilters } from "../model/order.types";
import { TApiResponse } from "@/shared/lib/fetcher";
import { orderService } from "./order.service";

type TUseGetOrdersProps = {
	page?: number;
	limit?: number;
	filters?: TOrderFilters;
};

export const useGetOrders = ({ page, limit, filters }: TUseGetOrdersProps) => {
	const { data, totalRows, totalPages, isFetching, error } =
		useApiPaginatedQuery<TOrder>({
			queryKey: ORDER_KEYS.LIST({ page, limit, ...filters }),
			queryFn: () =>
				orderService.getOrders({
					options: { params: { page, limit, ...filters } },
				}),
		});

	return {
		orders: data,
		totalRows,
		totalPages,
		isGettingOrders: isFetching,
		error,
	};
};

export const useGetOrder = ({ id }: { id: string }) => {
	const { data, isLoading, error } = useApiQuery<TApiResponse<TOrder>>({
		queryKey: ORDER_KEYS.DETAIL(id),
		queryFn: () => orderService.getOrder(id),
		enabled: !!id,
	});

	return {
		order: data?.data ?? null,
		isGettingOrder: isLoading,
		error,
	};
};
