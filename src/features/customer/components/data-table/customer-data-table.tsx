"use client";
import { useState, useMemo } from "react";
import { DataTable } from "@/shared/components/common/data-table";
import { getCustomerColumns } from "./customer-columns";
import { MainButton } from "@/shared/components/common/main-button";
import { PlusIcon } from "lucide-react";
import { useGetCustomers } from "@/entities/customer/api/customer.query";
import { TCustomer } from "@/entities/customer/model/customer.model";
import { CustomerForm } from "../forms/customer-form";
import { CustomerFilters } from "../filters/customer-filters";
import { useFilterParams } from "@/shared/hooks/use-filter-params";
import { TCustomerFilters } from "../../types/customer.types";

export const CustomerDataTable = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingCustomer, setEditingCustomer] = useState<TCustomer | undefined>(
		undefined
	);

	const { updateFiltersParams, clearFilers, searchParams } =
		useFilterParams<TCustomerFilters>();

	const filters: TCustomerFilters = {
		name: searchParams.get("name") ?? undefined,
		email: searchParams.get("email") ?? undefined,
		phone: searchParams.get("phone") ?? undefined,
	};

	const updateFilters = (newFilters: TCustomerFilters) => {
		updateFiltersParams({ filters: newFilters, options: { resetPage: true } });
	};

	const { customers, isGettingCustomers, totalRows, totalPages } =
		useGetCustomers({
			page: 1,
			limit: 10,
			filters,
		});

	const handleEdit = (customer: TCustomer) => {
		setEditingCustomer(customer);
		setIsFormOpen(true);
	};

	const handleCreate = () => {
		setEditingCustomer(undefined);
		setIsFormOpen(true);
	};

	const handleCloseForm = (open: boolean) => {
		setIsFormOpen(open);
		if (!open) {
			setEditingCustomer(undefined);
		}
	};

	const columns = useMemo(() => getCustomerColumns(handleEdit), []);

	return (
		<>
			<DataTable
				columns={columns}
				data={customers}
				searchablePlaceholder="Search customers"
				setSearchableField={value => updateFilters({ name: value })}
				isLoading={isGettingCustomers}
				pageCount={totalPages}
				totalCount={totalRows}
				manualPagination={true}
				searchValue={filters.name ?? ""}
				children={
					<div className="flex gap-4 w-full justify-between items-end">
						<CustomerFilters
							filters={filters}
							onFilterChange={updateFilters}
							onClearAllFilters={clearFilers}
							searchParams={searchParams}
						/>
						<MainButton onClick={handleCreate}>
							<PlusIcon /> Add Customer
						</MainButton>
					</div>
				}
			/>

			<CustomerForm
				open={isFormOpen}
				onOpenChange={handleCloseForm}
				customer={editingCustomer}
			/>
		</>
	);
};
