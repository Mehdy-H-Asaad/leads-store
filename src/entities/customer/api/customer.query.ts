import {
	useApiQuery,
	useApiPaginatedQuery,
} from "@/shared/hooks/use-api-query";
import { CUSTOMER_KEYS } from "./customer.keys";
import { TCustomer } from "../model/customer.model";
import { TApiResponse } from "@/shared/lib/fetcher";
import { customerService } from "./customer.service";

type TUseGetCustomersProps = {
	page?: number;
	limit?: number;
	filters?: { name?: string; email?: string; phone?: string };
};

export const useGetCustomers = ({
	page,
	limit,
	filters,
}: TUseGetCustomersProps) => {
	const { data, totalRows, totalPages, isFetching, error } =
		useApiPaginatedQuery<TCustomer>({
			queryKey: CUSTOMER_KEYS.LIST({ page, limit, ...filters }),
			queryFn: () =>
				customerService.getCustomers({
					options: { params: { page, limit, ...filters } },
				}),
		});

	return {
		customers: data,
		totalRows,
		totalPages,
		isGettingCustomers: isFetching,
		error,
	};
};

export const useGetCustomer = ({ id }: { id: string }) => {
	const { data, isLoading, error } = useApiQuery<TApiResponse<TCustomer>>({
		queryKey: CUSTOMER_KEYS.DETAIL(id),
		queryFn: () => customerService.getCustomer(id),
		enabled: !!id,
	});

	return {
		customer: data?.data ?? null,
		isGettingCustomer: isLoading,
		error,
	};
};
