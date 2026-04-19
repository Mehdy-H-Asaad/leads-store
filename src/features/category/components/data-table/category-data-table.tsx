"use client";
import { useState, useMemo } from "react";
import { DataTable } from "@/shared/components/common/data-table";
import { getCategoryColumns } from "./category-columns";
import { MainButton } from "@/shared/components/common/main-button";
import { PlusIcon } from "lucide-react";
import { useGetCategories } from "@/entities/category/api/category.query";
import { TCategory } from "@/entities/category/model/category.model";
import { CategoryForm } from "../forms/category-form";
import { useFilterParams } from "@/shared/hooks/use-filter-params";
import { TCategoryFilters } from "../../types/category.types";
import { DEFAULT_PAGE_SIZE } from "@/shared/types/types";

export const CategoryDataTable = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingCategory, setEditingCategory] = useState<TCategory | undefined>(
		undefined
	);

	const { updateFiltersParams, searchParams } =
		useFilterParams<TCategoryFilters>();

	const page = parseInt(searchParams.get("page") ?? "1", 10);
	const limit = parseInt(
		searchParams.get("limit") ?? DEFAULT_PAGE_SIZE.toString(),
		10
	);

	const filters: TCategoryFilters = {
		name: searchParams.get("name") ?? undefined,
	};

	const updateFilters = (newFilters: TCategoryFilters) => {
		updateFiltersParams({ filters: newFilters, options: { resetPage: true } });
	};

	const { categories, isGettingCategories, totalRows, totalPages } =
		useGetCategories({ page, limit, filters });

	const handleEdit = (category: TCategory) => {
		setEditingCategory(category);
		setIsFormOpen(true);
	};

	const handleCreate = () => {
		setEditingCategory(undefined);
		setIsFormOpen(true);
	};

	const handleCloseForm = (open: boolean) => {
		setIsFormOpen(open);
		if (!open) {
			setEditingCategory(undefined);
		}
	};

	const columns = useMemo(() => getCategoryColumns(handleEdit), []);

	return (
		<>
			<DataTable
				columns={columns}
				data={categories}
				searchablePlaceholder="Search categories"
				setSearchableField={value => updateFilters({ name: value })}
				isLoading={isGettingCategories}
				pageCount={totalPages}
				totalCount={totalRows}
				manualPagination={true}
				searchValue={filters.name ?? ""}
			>
				<MainButton onClick={handleCreate}>
					<PlusIcon /> Add Category
				</MainButton>
			</DataTable>

			<CategoryForm
				open={isFormOpen}
				onOpenChange={handleCloseForm}
				category={editingCategory}
			/>
		</>
	);
};
