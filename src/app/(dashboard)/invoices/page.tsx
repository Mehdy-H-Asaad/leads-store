import { PageHeader } from "@/shared/components/common/page-header";
import { InvoiceDataTable } from "@/features/invoice/components/data-table/invoice-data-table";
import { getQueryClient } from "@/shared/lib/query-client";
import { INVOICE_KEYS } from "@/entities/invoice/api/invoice.keys";
import { invoiceService } from "@/entities/invoice/api/invoice.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const page = async () => {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: INVOICE_KEYS.LIST({ page: 1, limit: 10 }),
		queryFn: () =>
			invoiceService.getInvoices({
				options: { params: { page: 1, limit: 10 } },
			}),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="flex flex-col gap-8">
			<PageHeader
				title="Invoices"
				description="Manage your store invoices"
			/>
			<HydrationBoundary state={dehydratedState}>
				<InvoiceDataTable />
			</HydrationBoundary>
		</div>
	);
};

export default page;
