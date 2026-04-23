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
import { Loader2, XIcon } from "lucide-react";
import { hasFiltersParams } from "@/shared/utils/has-filters-params";
import { ComboboxContent } from "@/shared/components/ui/combobox";
import {
	Combobox,
	ComboboxInput,
	ComboboxEmpty,
	ComboboxList,
	ComboboxItem,
} from "@/shared/components/ui/combobox";
import { Label } from "@/shared/components/ui/label";
import {
	useGetCustomer,
	useGetCustomers,
} from "@/entities/customer/api/customer.query";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { useEffect, useState } from "react";
import { useGetItem, useGetItems } from "@/entities/item/api/item.query";

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
	const [customerSearch, setCustomerSearch] = useState("");
	const [debouncedCustomerSearch, setDebouncedCustomerSearch] = useState("");

	const [itemSearch, setItemSearch] = useState("");
	const [debouncedItemSearch, setDebouncedItemSearch] = useState("");

	const debouncedSetItemSearch = useDebounce({
		callback: setDebouncedItemSearch,
		delay: 500,
	});

	const handleItemSearch = (value: string) => {
		setItemSearch(value);
		debouncedSetItemSearch(value);
	};
	const debouncedSetCustomerSearch = useDebounce({
		callback: setDebouncedCustomerSearch,
		delay: 500,
	});

	const handleCustomerSearch = (value: string) => {
		setCustomerSearch(value);
		debouncedSetCustomerSearch(value);
	};

	type TCustomerOption = {
		value: string;
		label: string;
	};

	type TItemOption = {
		value: string;
		label: string;
	};

	const { items, isGettingItems } = useGetItems({
		page: 1,
		limit: 30,
		filters: { name: debouncedItemSearch },
	});

	const { customers, isGettingCustomers } = useGetCustomers({
		page: 1,
		limit: 30,
		filters: { name: debouncedCustomerSearch },
	});

	const { item: selectedItem } = useGetItem({
		id: filters.item_id ?? "",
	});
	const { customer: selectedCustomer } = useGetCustomer({
		id: filters.customer_id ?? "",
	});

	const customerOptions = [
		{ value: "all", label: "All" },
		...(customers ?? []).map(customer => ({
			value: customer.id,
			label: customer.name,
		})),
	];

	const itemOptions = [
		{ value: "all", label: "All" },
		...(items ?? []).map(item => ({
			value: item.id,
			label: item.name,
		})),
	];

	useEffect(() => {
		if (selectedCustomer) {
			setCustomerSearch(selectedCustomer.name);
		} else {
			setCustomerSearch("");
		}
	}, [selectedCustomer]);

	useEffect(() => {
		if (selectedItem) {
			setItemSearch(selectedItem.name);
		} else {
			setItemSearch("");
		}
	}, [selectedItem]);

	return (
		<div className="flex items-center gap-4 flex-wrap">
			<div className="flex flex-col gap-2">
				<Label>Customer</Label>
				<Combobox
					items={customerOptions}
					itemToStringValue={(customer: TCustomerOption) => customer.label}
					value={
						selectedCustomer
							? { value: selectedCustomer.id, label: selectedCustomer.name }
							: null
					}
					onValueChange={value => {
						setCustomerSearch(value?.label ?? "");
						setDebouncedCustomerSearch("");
						onFilterChange({ customer_id: value?.value });
					}}
					isItemEqualToValue={(
						objectA: TCustomerOption,
						objectB: TCustomerOption
					) => objectA.value === objectB.value}
				>
					<ComboboxInput
						value={customerSearch}
						placeholder="Search customers..."
						onChange={e => handleCustomerSearch(e.target.value)}
					/>
					<ComboboxContent>
						<ComboboxEmpty>
							{isGettingCustomers ? (
								<Loader2 className="w-4 h-4 animate-spin mx-auto" />
							) : (
								"No customers found"
							)}
						</ComboboxEmpty>
						<ComboboxList>
							{(customer: TCustomerOption) => (
								<ComboboxItem key={customer.value} value={customer}>
									{customer.label}
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>
			</div>
			<div className="flex flex-col gap-2">
				<Label>Item</Label>
				<Combobox
					items={itemOptions}
					itemToStringValue={(item: TItemOption) => item.label}
					value={
						selectedItem
							? { value: selectedItem.id, label: selectedItem.name }
							: null
					}
					onValueChange={value => {
						setItemSearch(value?.label ?? "");
						setDebouncedItemSearch("");
						onFilterChange({ item_id: value?.value });
					}}
					isItemEqualToValue={(objectA: TItemOption, objectB: TItemOption) =>
						objectA.value === objectB.value
					}
				>
					<ComboboxInput
						value={itemSearch}
						placeholder="Search items..."
						onChange={e => handleItemSearch(e.target.value)}
					/>
					<ComboboxContent>
						<ComboboxEmpty>
							{isGettingItems ? (
								<Loader2 className="w-4 h-4 animate-spin mx-auto" />
							) : (
								"No items found"
							)}
						</ComboboxEmpty>
						<ComboboxList>
							{(item: TItemOption) => (
								<ComboboxItem key={item.value} value={item}>
									{item.label}
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
						onFilterChange({ status: value as ORDER_STATUS });
					}}
				>
					<SelectTrigger className="capitalize w-44">
						<SelectValue placeholder="Filter by status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						{Object.values(ORDER_STATUS).map(status => (
							<SelectItem className="capitalize" key={status} value={status}>
								{status.replace(/_/g, " ")}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex flex-col gap-2">
				<Label>Delivery Status</Label>
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
						<SelectItem value="all">All</SelectItem>
						{Object.values(DELIVERY_STATUS).map(status => (
							<SelectItem className="capitalize" key={status} value={status}>
								{status.replace(/_/g, " ")}
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
