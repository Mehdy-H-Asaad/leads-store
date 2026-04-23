"use client";

import { useState, useEffect } from "react";
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import { Button } from "@/shared/components/ui/button";
import { TItemFilters } from "@/features/item/types/item.types";
import { Loader2, XIcon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { hasFiltersParams } from "@/shared/utils/has-filters-params";
import {
	useGetCategories,
	useGetCategory,
} from "@/entities/category/api/category.query";
import { Label } from "@/shared/components/ui/label";
import {
	Combobox,
	ComboboxList,
	ComboboxEmpty,
	ComboboxContent,
	ComboboxInput,
	ComboboxItem,
} from "@/shared/components/ui/combobox";
import { useDebounce } from "@/shared/hooks/use-debounce";

type TItemFiltersProps = {
	filters: TItemFilters;
	onFilterChange: (filters: TItemFilters) => void;
	onClearAllFilters: () => void;
};

export const ItemFilters = ({
	filters,
	onFilterChange,
	onClearAllFilters,
}: TItemFiltersProps) => {
	const { category: selectedCategory } = useGetCategory({
		id: filters.category_id ?? "",
	});

	const [localName, setLocalName] = useState(filters.name ?? "");
	const [categorySearch, setCategorySearch] = useState("");
	const [debouncedCategorySearch, setDebouncedCategorySearch] = useState("");

	const debouncedSetCategorySearch = useDebounce({
		callback: setDebouncedCategorySearch,
		delay: 500,
	});

	const handleCategorySearch = (value: string) => {
		setCategorySearch(value);
		debouncedSetCategorySearch(value);
	};

	useEffect(() => {
		const next = filters.name ?? "";
		if (localName !== next) setLocalName(next);
		if (selectedCategory) {
			setCategorySearch(selectedCategory.name);
		} else {
			setCategorySearch("");
		}
	}, [filters.name, selectedCategory]);

	const { categories, isGettingCategories } = useGetCategories({
		page: 1,
		limit: 30,
		filters: { name: debouncedCategorySearch },
	});

	type TCategoryOption = {
		value: string;
		label: string;
	};

	const categoryOptions = [
		{ value: "all", label: "All" },
		...(categories?.map(category => ({
			value: category.id,
			label: category.name,
		})) ?? []),
	];

	return (
		<div className="flex items-center gap-4 flex-wrap">
			<div className="flex flex-col gap-2">
				<Label>Category</Label>
				<Combobox
					items={categoryOptions}
					itemToStringValue={(category: TCategoryOption) => category.label}
					value={
						selectedCategory
							? { value: selectedCategory.id, label: selectedCategory.name }
							: null
					}
					onValueChange={value => {
						setCategorySearch(value?.label ?? "");
						setDebouncedCategorySearch("");
						onFilterChange({ category_id: value?.value });
					}}
					isItemEqualToValue={(
						objectA: TCategoryOption,
						objectB: TCategoryOption
					) => objectA.value === objectB.value}
				>
					<ComboboxInput
						// value={categorySearch}
						value={categorySearch}
						placeholder="Search categories..."
						onChange={e => handleCategorySearch(e.target.value)}
					/>
					<ComboboxContent>
						<ComboboxEmpty>
							{isGettingCategories ? (
								<Loader2 className="w-4 h-4 animate-spin mx-auto" />
							) : (
								"No categories found"
							)}
						</ComboboxEmpty>
						<ComboboxList>
							{(category: TCategoryOption) => (
								<ComboboxItem key={category.value} value={category}>
									{category.label}
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>
			</div>
			<div className="flex flex-col gap-2">
				<Label>Status</Label>
				<Select
					value={filters.status ?? ""}
					onValueChange={value => {
						onFilterChange({ status: value as ITEM_STATUS });
					}}
				>
					<SelectTrigger className="capitalize w-40">
						<SelectValue placeholder="Select status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						{Object.values(ITEM_STATUS).map(status => (
							<SelectItem className="capitalize" key={status} value={status}>
								{status.split("_").join(" ")}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex flex-col gap-2">
				<Label>Visibility</Label>
				<Select
					value={
						filters.is_visible === undefined ? "" : String(filters.is_visible)
					}
					onValueChange={value => {
						onFilterChange({ is_visible: value === "true" });
					}}
				>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Visibility" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						<SelectItem value="true">Visible</SelectItem>
						<SelectItem value="false">Hidden</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="flex flex-col gap-2">
				<Label>Type</Label>
				<Select
					value={filters.type ?? ""}
					onValueChange={value => {
						onFilterChange({ type: value as ITEM_TYPE });
					}}
				>
					<SelectTrigger className="capitalize w-40">
						<SelectValue placeholder="Select type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						{Object.values(ITEM_TYPE).map(type => (
							<SelectItem className="capitalize" key={type} value={type}>
								{type}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			{hasFiltersParams(filters) && (
				<Button
					variant="outline"
					onClick={onClearAllFilters}
					className="mt-auto"
				>
					<XIcon className="size-4" />
					Clear Filters
				</Button>
			)}
		</div>
	);
};
