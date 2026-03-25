"use client";
import { useState, useMemo } from "react";
import { DataTable } from "@/shared/components/common/data-table";
import { getItemColumns } from "./item-columns";
import { MainButton } from "@/shared/components/common/main-button";
import { PlusIcon } from "lucide-react";
import { useFilterParams } from "@/shared/hooks/use-filter-params";
import { TItemFilters } from "../../types/item.types";
import { ItemFilters } from "../filters/item-filters";
import { ItemForm } from "../forms/item-form";
import { ITEM_STATUS } from "@/shared/contracts/item/item.contract";
import { useGetItems } from "@/entities/item/api/item.query";
import { TItem } from "@/entities/item/model/item.model";

export const ItemDataTable = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<TItem | undefined>(undefined);

	const { updateFiltersParams, clearFilers, searchParams } =
		useFilterParams<TItemFilters>();

	const filters: TItemFilters = {
		visibility: searchParams.get("visibility") === "true",
		name: searchParams.get("name") ?? undefined,
		category: searchParams.get("category") ?? undefined,
		price: searchParams.get("price")
			? parseFloat(searchParams.get("price")!)
			: undefined,
		status: searchParams.get("status") as ITEM_STATUS,
	};

	const updateFilters = (filters: TItemFilters) => {
		updateFiltersParams({ filters: filters, options: { resetPage: true } });
	};

	const { items, isGettingItems } = useGetItems({ page: 1, limit: 10 });

	const handleEdit = (item: TItem) => {
		setEditingItem(item);
		setIsFormOpen(true);
	};

	const handleCreate = () => {
		setEditingItem(undefined);
		setIsFormOpen(true);
	};

	const handleCloseForm = (open: boolean) => {
		setIsFormOpen(open);
		if (!open) {
			setEditingItem(undefined);
		}
	};

	const columns = useMemo(() => getItemColumns(handleEdit), []);

	return (
		<>
			<DataTable
				columns={columns}
				data={items}
				searchablePlaceholder="Search items"
				setSearchableField={() => {}}
				isLoading={isGettingItems}
				pageCount={1}
				totalCount={items.length}
				manualPagination={true}
				children={
					<>
						<div className="mr-auto w-fit">
							<ItemFilters
								filters={filters}
								onFilterChange={updateFilters}
								onClearAllFilters={clearFilers}
								searchParams={searchParams}
							/>
						</div>
						<MainButton onClick={handleCreate}>
							<PlusIcon /> Add Item
						</MainButton>
					</>
				}
			/>

			<ItemForm
				open={isFormOpen}
				onOpenChange={handleCloseForm}
				item={editingItem}
			/>
		</>
	);
};
