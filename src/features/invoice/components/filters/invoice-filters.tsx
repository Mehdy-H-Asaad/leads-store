"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { TInvoiceFilters } from "../../types/invoice.types";
import { XIcon } from "lucide-react";
import { hasFiltersParams } from "@/shared/utils/has-filters-params";

type TInvoiceFiltersProps = {
	filters: TInvoiceFilters;
	onFilterChange: (filters: TInvoiceFilters) => void;
	onClearAllFilters: () => void;
};

export const InvoiceFilters = ({
	filters,
	onFilterChange,
	onClearAllFilters,
}: TInvoiceFiltersProps) => {
	return (
		<div className="flex items-center gap-4 flex-wrap">
			<div className="flex flex-col gap-2">
				<Label>Invoice Number</Label>
				<Input
					className="w-44"
					placeholder="Invoice number"
					value={filters.invoice_number ?? ""}
					onChange={e =>
						onFilterChange({ invoice_number: e.target.value || undefined })
					}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label>Order Number</Label>
				<Input
					className="w-44"
					placeholder="Order number"
					value={filters.order_number ?? ""}
					onChange={e =>
						onFilterChange({ order_number: e.target.value || undefined })
					}
				/>
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
