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
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import { useGetItems } from "@/entities/item/api/item.query";
import { TItem } from "@/entities/item/model/item.model";

export const ItemDataTable = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<TItem | undefined>(undefined);

	const { updateFiltersParams, clearFilers, searchParams } =
		useFilterParams<TItemFilters>();

	const filters: TItemFilters = {
		name: searchParams.get("name") ?? undefined,
		category_id: searchParams.get("category_id") ?? undefined,
		status: (searchParams.get("status") as ITEM_STATUS) ?? undefined,
		is_visible: searchParams.has("is_visible")
			? searchParams.get("is_visible") === "true"
			: undefined,
		type: (searchParams.get("type") as ITEM_TYPE) ?? undefined,
	};

	const updateFilters = (newFilters: TItemFilters) => {
		updateFiltersParams({ filters: newFilters, options: { resetPage: true } });
	};

	const { items, isGettingItems, totalRows, totalPages } = useGetItems({
		page: 1,
		limit: 10,
		filters,
	});

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
				setSearchableField={value => updateFilters({ name: value })}
				searchValue={filters.name ?? ""}
				isLoading={isGettingItems}
				pageCount={totalPages}
				totalCount={totalRows}
				manualPagination={true}
			>
				<div className="flex gap-4 w-full justify-between">
					<ItemFilters
						filters={filters}
						onFilterChange={updateFilters}
						onClearAllFilters={clearFilers}
					/>
					<MainButton onClick={handleCreate}>
						<PlusIcon /> Add Item
					</MainButton>
				</div>
			</DataTable>

			<ItemForm
				open={isFormOpen}
				onOpenChange={handleCloseForm}
				item={editingItem}
			/>
		</>
	);
};
