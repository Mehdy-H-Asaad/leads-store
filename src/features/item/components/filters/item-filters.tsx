"use client";

import { ComboboxSelect } from "@/shared/components/common/select/combobox-select";
import { ITEM_STATUS } from "@/shared/contracts/item/item.contract";
import { ITEM_CATEGORIES } from "@/features/item/constants/item.constants";
import { Button } from "@/shared/components/ui/button";
import { TItemFilters } from "@/features/item/types/item.types";
import { XIcon } from "lucide-react";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";

type TItemFiltersProps = {
	filters: TItemFilters;
	onFilterChange: (filters: TItemFilters) => void;
	onClearAllFilters: () => void;
	searchParams: ReadonlyURLSearchParams;
};

export const ItemFilters = ({
	filters,
	onFilterChange,
	onClearAllFilters,
	searchParams,
}: TItemFiltersProps) => {
	const clearFilters = () => {
		onClearAllFilters();
	};

	return (
		<div className="flex items-center gap-4 flex-wrap">
			<div className="flex flex-col gap-2">
				<ComboboxSelect
					value={filters.category}
					options={ITEM_CATEGORIES.map(category => ({
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
							status: value as ITEM_STATUS,
						});
					}}
				>
					<SelectTrigger className="capitalize">
						<SelectValue placeholder="Select status" />
					</SelectTrigger>
					<SelectContent>
						{Object.values(ITEM_STATUS).map(status => (
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
