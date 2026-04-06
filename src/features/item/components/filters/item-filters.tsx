"use client";

import { useState, useEffect } from "react";
import { ComboboxSelect } from "@/shared/components/common/select/combobox-select";
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import { ITEM_CATEGORIES } from "@/features/item/constants/item.constants";
import { Button } from "@/shared/components/ui/button";
import { TItemFilters } from "@/features/item/types/item.types";
import { XIcon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { hasFiltersParams } from "@/shared/utils/has-filters-params";

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
	const [localName, setLocalName] = useState(filters.name ?? "");

	useEffect(() => {
		const next = filters.name ?? "";
		if (localName !== next) setLocalName(next);
	}, [filters.name]);

	return (
		<div className="flex items-center gap-4 flex-wrap">
			<div>
				<ComboboxSelect
					value={filters.category_id}
					options={ITEM_CATEGORIES.map(category => ({
						value: category,
						label: category.replace("_", " "),
					}))}
					onChange={value => {
						onFilterChange({ category_id: value as string });
					}}
					placeholder="Select category"
				/>
			</div>
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
					{Object.values(ITEM_STATUS).map(status => (
						<SelectItem className="capitalize" key={status} value={status}>
							{status.split("_").join(" ")}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Select
				value={
					filters.is_visible === undefined ? "" : String(filters.is_visible)
				}
				onValueChange={value => {
					onFilterChange({ is_visible: value === "true" });
				}}
			>
				<SelectTrigger className="w-36">
					<SelectValue placeholder="Visibility" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="true">Visible</SelectItem>
					<SelectItem value="false">Hidden</SelectItem>
				</SelectContent>
			</Select>

			<Select
				value={filters.type ?? ""}
				onValueChange={value => {
					onFilterChange({ type: value as ITEM_TYPE });
				}}
			>
				<SelectTrigger className="capitalize w-36">
					<SelectValue placeholder="Select type" />
				</SelectTrigger>
				<SelectContent>
					{Object.values(ITEM_TYPE).map(type => (
						<SelectItem className="capitalize" key={type} value={type}>
							{type}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

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
