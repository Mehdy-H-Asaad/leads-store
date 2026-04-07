"use client";
import { useState, useMemo } from "react";
import { DataTable } from "@/shared/components/common/data-table";
import { getOrderColumns } from "./order-columns";
import { MainButton } from "@/shared/components/common/main-button";
import { PlusIcon } from "lucide-react";
import { useFilterParams } from "@/shared/hooks/use-filter-params";
import { TOrderFilters } from "../../types/order.types";
import { OrderFilters } from "../filters/order-filters";
import { OrderForm } from "../forms/order-form";
import {
	ORDER_STATUS,
	DELIVERY_STATUS,
} from "@/shared/contracts/order/order.contract";
import { useGetOrders } from "@/entities/order/api/order.query";
import { TOrder } from "@/entities/order/model/order.model";

export const OrderDataTable = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingOrder, setEditingOrder] = useState<TOrder | undefined>(
		undefined
	);

	const { updateFiltersParams, clearFilers, searchParams } =
		useFilterParams<TOrderFilters>();

	const filters: TOrderFilters = {
		status: (searchParams.get("status") as ORDER_STATUS) ?? undefined,
		customer_id: searchParams.get("customer_id") ?? undefined,
		item_id: searchParams.get("item_id") ?? undefined,
		delivery_status:
			(searchParams.get("delivery_status") as DELIVERY_STATUS) ?? undefined,
	};

	const updateFilters = (newFilters: TOrderFilters) => {
		updateFiltersParams({ filters: newFilters, options: { resetPage: true } });
	};

	const { orders, isGettingOrders, totalRows, totalPages } = useGetOrders({
		page: 1,
		limit: 10,
		filters,
	});

	const handleEdit = (order: TOrder) => {
		setEditingOrder(order);
		setIsFormOpen(true);
	};

	const handleCreate = () => {
		setEditingOrder(undefined);
		setIsFormOpen(true);
	};

	const handleCloseForm = (open: boolean) => {
		setIsFormOpen(open);
		if (!open) {
			setEditingOrder(undefined);
		}
	};

	const columns = useMemo(() => getOrderColumns(handleEdit), []);

	return (
		<>
			<DataTable
				columns={columns}
				data={orders}
				isLoading={isGettingOrders}
				pageCount={totalPages}
				totalCount={totalRows}
				manualPagination={true}
			>
				<div className="flex gap-4 w-full justify-between">
					<OrderFilters
						filters={filters}
						onFilterChange={updateFilters}
						onClearAllFilters={clearFilers}
					/>
					<MainButton onClick={handleCreate}>
						<PlusIcon /> Add Order
					</MainButton>
				</div>
			</DataTable>

			<OrderForm
				open={isFormOpen}
				onOpenChange={handleCloseForm}
				order={editingOrder}
			/>
		</>
	);
};
