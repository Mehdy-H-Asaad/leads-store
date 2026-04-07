"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import {
	ORDER_STATUS,
	DELIVERY_STATUS,
} from "@/shared/contracts/order/order.contract";
import { Button } from "@/shared/components/ui/button";
import { TOrderFilters } from "@/features/order/types/order.types";
import { XIcon } from "lucide-react";
import { hasFiltersParams } from "@/shared/utils/has-filters-params";

type TOrderFiltersProps = {
	filters: TOrderFilters;
	onFilterChange: (filters: TOrderFilters) => void;
	onClearAllFilters: () => void;
};

export const OrderFilters = ({
	filters,
	onFilterChange,
	onClearAllFilters,
}: TOrderFiltersProps) => {
	return (
		<div className="flex items-center gap-4 flex-wrap">
			<Select
				value={filters.status ?? ""}
				onValueChange={value => {
					onFilterChange({ status: value as ORDER_STATUS });
				}}
			>
				<SelectTrigger className="capitalize w-44">
					<SelectValue placeholder="Filter by status" />
				</SelectTrigger>
				<SelectContent>
					{Object.values(ORDER_STATUS).map(status => (
						<SelectItem className="capitalize" key={status} value={status}>
							{status.replace(/_/g, " ")}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Select
				value={filters.delivery_status ?? ""}
				onValueChange={value => {
					onFilterChange({ delivery_status: value as DELIVERY_STATUS });
				}}
			>
				<SelectTrigger className="capitalize w-44">
					<SelectValue placeholder="Delivery status" />
				</SelectTrigger>
				<SelectContent>
					{Object.values(DELIVERY_STATUS).map(status => (
						<SelectItem className="capitalize" key={status} value={status}>
							{status.replace(/_/g, " ")}
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
