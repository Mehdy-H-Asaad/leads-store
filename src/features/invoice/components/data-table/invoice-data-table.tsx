"use client";
import { useState } from "react";
import { DataTable } from "@/shared/components/common/data-table";
import { invoiceColumns } from "./invoice-columns";
import { MainButton } from "@/shared/components/common/main-button";
import { PlusIcon } from "lucide-react";
import { useFilterParams } from "@/shared/hooks/use-filter-params";
import { TInvoiceFilters } from "../../types/invoice.types";
import { InvoiceFilters } from "../filters/invoice-filters";
import { InvoiceForm } from "../forms/invoice-form";
import { useGetInvoices } from "@/entities/invoice/api/invoice.query";

export const InvoiceDataTable = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);

	const { updateFiltersParams, clearFilers, searchParams } =
		useFilterParams<TInvoiceFilters>();

	const filters: TInvoiceFilters = {
		invoice_number: searchParams.get("invoice_number") ?? undefined,
		order_number: searchParams.get("order_number") ?? undefined,
		order_reference_number:
			searchParams.get("order_reference_number") ?? undefined,
	};

	const updateFilters = (newFilters: TInvoiceFilters) => {
		updateFiltersParams({ filters: newFilters, options: { resetPage: true } });
	};

	const { invoices, isGettingInvoices, totalRows, totalPages } =
		useGetInvoices({
			page: 1,
			limit: 10,
			filters,
		});

	return (
		<>
			<DataTable
				columns={invoiceColumns}
				data={invoices}
				isLoading={isGettingInvoices}
				pageCount={totalPages}
				totalCount={totalRows}
				manualPagination={true}
				setSearchableField={value =>
					updateFilters({ invoice_number: value || undefined })
				}
				searchValue={filters.invoice_number ?? ""}
				searchablePlaceholder="Search invoices"
			>
				<div className="flex gap-4 w-full justify-between">
					<InvoiceFilters
						filters={filters}
						onFilterChange={updateFilters}
						onClearAllFilters={clearFilers}
					/>
					<MainButton onClick={() => setIsFormOpen(true)}>
						<PlusIcon /> Add Invoice
					</MainButton>
				</div>
			</DataTable>

			<InvoiceForm open={isFormOpen} onOpenChange={setIsFormOpen} />
		</>
	);
};
