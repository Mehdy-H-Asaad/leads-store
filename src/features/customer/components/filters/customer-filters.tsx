"use client";

import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { TCustomerFilters } from "@/features/customer/types/customer.types";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { XIcon } from "lucide-react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { hasFiltersParams } from "@/shared/utils/has-filters-params";
import { Label } from "@/shared/components/ui/label";

type TCustomerFiltersProps = {
	filters: TCustomerFilters;
	onFilterChange: (filters: TCustomerFilters) => void;
	onClearAllFilters: () => void;
	searchParams: ReadonlyURLSearchParams;
};

export const CustomerFilters = ({
	filters,
	onFilterChange,
	onClearAllFilters,
}: TCustomerFiltersProps) => {
	const [localFilters, setLocalFilters] = useState<TCustomerFilters>({
		email: filters.email ?? "",
		phone: filters.phone ?? "",
	});

	useEffect(() => {
		setLocalFilters(prev => {
			const nextEmail = filters.email ?? "";
			const nextPhone = filters.phone ?? "";
			if (prev.email === nextEmail && prev.phone === nextPhone) return prev;
			return { email: nextEmail, phone: nextPhone };
		});
	}, [filters]);

	const debouncedFilterChange = useDebounce<[TCustomerFilters]>({
		callback: onFilterChange,
		delay: 500,
	});

	const handleChange = (field: keyof TCustomerFilters, value: string) => {
		const updatedFilters = { ...localFilters, [field]: value };
		setLocalFilters(updatedFilters);
		debouncedFilterChange(updatedFilters);
	};

	return (
		<div className="flex items-center gap-4 flex-wrap">
			<div className="flex flex-col gap-2">
				<Label>Email</Label>
				<Input
					placeholder="Search by email"
					value={localFilters.email ?? ""}
					onChange={e => handleChange("email", e.target.value)}
					className="w-48"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label>Phone</Label>
				<Input
					placeholder="Search by phone"
					value={localFilters.phone ?? ""}
					onChange={e => handleChange("phone", e.target.value)}
					className="w-40"
				/>
			</div>
			{hasFiltersParams(filters) && (
				<Button variant="outline" onClick={onClearAllFilters}>
					<XIcon className="size-4" />
					Clear Filters
				</Button>
			)}
		</div>
	);
};
