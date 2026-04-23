import {
	useApiQuery,
	useApiPaginatedQuery,
} from "@/shared/hooks/use-api-query";
import { INVOICE_KEYS } from "./invoice.keys";
import { TInvoice } from "../model/invoice.model";
import { TInvoiceFilters } from "../model/invoice.types";
import { TApiResponse } from "@/shared/lib/fetcher";
import { invoiceService } from "./invoice.service";

type TUseGetInvoicesProps = {
	page?: number;
	limit?: number;
	filters?: TInvoiceFilters;
};

export const useGetInvoices = ({
	page,
	limit,
	filters,
}: TUseGetInvoicesProps) => {
	const { data, totalRows, totalPages, isFetching, error } =
		useApiPaginatedQuery<TInvoice>({
			queryKey: INVOICE_KEYS.LIST({ page, limit, ...filters }),
			queryFn: () =>
				invoiceService.getInvoices({
					options: { params: { page, limit, ...filters } },
				}),
		});

	return {
		invoices: data,
		totalRows,
		totalPages,
		isGettingInvoices: isFetching,
		error,
	};
};

export const useGetInvoice = ({ id }: { id: string }) => {
	const { data, isLoading, error } = useApiQuery<TApiResponse<TInvoice>>({
		queryKey: INVOICE_KEYS.DETAIL(id),
		queryFn: () => invoiceService.getInvoice(id),
		enabled: !!id,
	});

	return {
		invoice: data?.data ?? null,
		isGettingInvoice: isLoading,
		error,
	};
};
