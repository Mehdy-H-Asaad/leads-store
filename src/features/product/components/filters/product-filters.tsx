"use client";

import { ComboboxSelect } from "@/components/common/select/combobox-select";
import { PRODUCT_STATUS } from "@/contracts/product/product.contract";
import { PRODUCT_CATEGORIES } from "@/features/product/constants/product.constants";
import { Button } from "@/components/ui/button";
import { TProductFilters } from "@/features/product/types/product.types";
import { XIcon } from "lucide-react";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type TProductFiltersProps = {
	filters: TProductFilters;
	onFilterChange: (filters: TProductFilters) => void;
	onClearAllFilters: () => void;
	searchParams: ReadonlyURLSearchParams;
};

export const ProductFilters = ({
	filters,
	onFilterChange,
	onClearAllFilters,
	searchParams,
}: TProductFiltersProps) => {
	const clearFilters = () => {
		onClearAllFilters();
	};

	return (
		<div className="flex items-center gap-4 flex-wrap">
			<div className="flex flex-col gap-2">
				<ComboboxSelect
					value={filters.category}
					options={PRODUCT_CATEGORIES.map(category => ({
						value: category,
						label: category.replace("_", " "),
					}))}
					onChange={value => {
						onFilterChange({
							category: value as string,
						});
					}}
					placeholder="Select category"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Select
					value={filters.status ?? undefined}
					onValueChange={value => {
						onFilterChange({
							status: value as PRODUCT_STATUS,
						});
					}}
				>
					<SelectTrigger className="capitalize">
						<SelectValue placeholder="Select status" />
					</SelectTrigger>
					<SelectContent>
						{Object.values(PRODUCT_STATUS).map(status => (
							<SelectItem className="capitalize" key={status} value={status}>
								{status.split("_").join(" ")}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{searchParams.size > 0 && (
				<Button variant="outline" onClick={clearFilters} className="mt-auto">
					<XIcon className="size-4" />
					Clear Filters
				</Button>
			)}
		</div>
	);
};
