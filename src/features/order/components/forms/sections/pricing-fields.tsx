import { useEffect } from "react";
import { Controller, useWatch, UseFormReturn } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
	TCreateOrderFormValues,
	TUpdateOrderFormValues,
} from "@/features/order/schema/order-form.schema";
import { useGetItem } from "@/entities/item/api/item.query";
import { TOrder } from "@/entities/order/model/order.model";
import { handleNumberInput } from "@/shared/utils/handle-number-input";

type TPricingFieldsProps = {
	form: UseFormReturn<TUpdateOrderFormValues | TCreateOrderFormValues>;
	order?: TOrder;
};

export const PricingFields = ({ form, order }: TPricingFieldsProps) => {
	const itemId = useWatch({
		control: form.control,
		name: "itemId",
	});

	const itemPrice = useWatch({ control: form.control, name: "itemPrice" });
	const quantity = useWatch({ control: form.control, name: "quantity" });

	const { item, isGettingItem } = useGetItem({ id: itemId });

	useEffect(() => {
		if (!order && item) {
			form.setValue("itemPrice", item.price);
			if (item.cost != null) {
				form.setValue("totalCost", item.cost);
			}
		}
	}, [item]);

	useEffect(() => {
		const price = Number(itemPrice) || 0;
		const qty = Number(quantity) || 0;
		if (price > 0 && qty > 0) {
			form.setValue("total", price * qty);
		}
	}, [itemPrice, quantity]);

	return (
		<>
			<div className="grid grid-cols-2 gap-4">
				<Controller
					control={form.control}
					name="itemPrice"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Item Price</FieldLabel>
							<Input
								type="number"
								min={0}
								step="0.01"
								placeholder="Item Price"
								{...field}
								value={field.value ?? ""}
								onChange={e => {
									field.onChange(handleNumberInput(e.target.value));
								}}
								disabled={isGettingItem}
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.error && (
								<FieldError>{fieldState.error.message}</FieldError>
							)}
						</Field>
					)}
				/>
				<Controller
					control={form.control}
					name="quantity"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>
								Quantity <span className="text-red-500">*</span>
							</FieldLabel>
							<Input
								type="number"
								min={0}
								placeholder="Quantity"
								{...field}
								value={field.value ?? ""}
								onChange={e => {
									field.onChange(handleNumberInput(e.target.value));
								}}
								disabled={isGettingItem}
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.error && (
								<FieldError>{fieldState.error.message}</FieldError>
							)}
						</Field>
					)}
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<Controller
					control={form.control}
					name="total"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Total</FieldLabel>
							<Input
								type="number"
								min={0}
								step="0.01"
								placeholder="Total"
								{...field}
								value={field.value ?? ""}
								onChange={e => {
									field.onChange(handleNumberInput(e.target.value));
								}}
								disabled={isGettingItem}
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.error && (
								<FieldError>{fieldState.error.message}</FieldError>
							)}
						</Field>
					)}
				/>
				<Controller
					control={form.control}
					name="totalCost"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Total Cost</FieldLabel>
							<Input
								type="number"
								min={0}
								step="0.01"
								placeholder="Total Cost"
								{...field}
								value={field.value ?? ""}
								onChange={e => {
									field.onChange(handleNumberInput(e.target.value));
								}}
								disabled={isGettingItem}
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.error && (
								<FieldError>{fieldState.error.message}</FieldError>
							)}
						</Field>
					)}
				/>
			</div>
		</>
	);
};
