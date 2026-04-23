import { Field, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { AsyncSelectFormField } from "@/shared/components/common/select/async-select-form-field";
import { TOrder } from "@/entities/order/model/order.model";
import { UseFormReturn } from "react-hook-form";
import {
	TCreateOrderFormValues,
	TUpdateOrderFormValues,
} from "@/features/order/schema/order-form.schema";

type TSelectOption = { value: string; label: string };

type TCustomerItemFieldsProps = {
	isEditMode: boolean;
	createForm: UseFormReturn<TCreateOrderFormValues>;
	updateForm: UseFormReturn<TUpdateOrderFormValues>;
	order?: TOrder;
	isGettingCustomers: boolean;
	isGettingItems: boolean;
	customerOptions: TSelectOption[];
	itemOptions: TSelectOption[];
	onCustomerSearch: (value: string) => void;
	onItemSearch: (value: string) => void;
};

export const CustomerItemFields = ({
	isEditMode,
	createForm,
	updateForm,
	order,
	isGettingCustomers,
	isGettingItems,
	customerOptions,
	itemOptions,
	onCustomerSearch,
	onItemSearch,
}: TCustomerItemFieldsProps) => {
	if (!isEditMode) {
		return (
			<div className="grid grid-cols-2 gap-4">
				<AsyncSelectFormField
					form={createForm}
					name="customerId"
					label="Customer"
					isRequired
					placeholder="Search customers..."
					options={customerOptions}
					onSearch={onCustomerSearch}
					isLoading={isGettingCustomers}
				/>
				<AsyncSelectFormField
					form={createForm}
					name="itemId"
					label="Item"
					isRequired
					placeholder="Search items..."
					options={itemOptions}
					onSearch={onItemSearch}
					isLoading={isGettingItems}
				/>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-4">
			<Field>
				<FieldLabel>Customer</FieldLabel>
				<Input value={order?.customer?.name ?? ""} disabled />
			</Field>
			<AsyncSelectFormField
				form={updateForm}
				name="itemId"
				label="Item"
				isRequired
				placeholder="Search items..."
				options={itemOptions}
				onSearch={onItemSearch}
				defaultLabel={order?.item?.name}
				isLoading={isGettingItems}
			/>
		</div>
	);
};
