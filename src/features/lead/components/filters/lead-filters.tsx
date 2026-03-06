"use client";

import { ComboboxSelect } from "@/components/common/select/combobox-select";
import { LEAD_STATUS } from "@/contracts/lead/lead.contract";
import { LEAD_SOURCES } from "@/features/lead/constants/lead.constants";
import { Button } from "@/components/ui/button";
import { TLeadFilters } from "@/features/lead/types/lead.types";
import { XIcon } from "lucide-react";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type TLeadFiltersProps = {
	filters: TLeadFilters;
	onFilterChange: (filters: TLeadFilters) => void;
	onClearAllFilters: () => void;
	searchParams: ReadonlyURLSearchParams;
};

export const LeadFilters = ({
	filters,
	onFilterChange,
	onClearAllFilters,
	searchParams,
}: TLeadFiltersProps) => {
	const clearFilters = () => {
		onClearAllFilters();
	};

	return (
		<div className="flex items-center gap-4 flex-wrap">
			<div className="flex flex-col gap-2">
				<ComboboxSelect
					value={filters.source}
					options={LEAD_SOURCES.map(source => ({
						value: source,
						label: source,
					}))}
					onChange={value => {
						onFilterChange({
							source: value as string,
						});
					}}
					placeholder="Select source"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Select
					value={filters.status ?? undefined}
					onValueChange={value => {
						onFilterChange({
							status: value as LEAD_STATUS,
						});
					}}
				>
					<SelectTrigger className="capitalize">
						<SelectValue placeholder="Select status" />
					</SelectTrigger>
					<SelectContent>
						{Object.values(LEAD_STATUS).map(status => (
							<SelectItem className="capitalize" key={status} value={status}>
								{status}
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
