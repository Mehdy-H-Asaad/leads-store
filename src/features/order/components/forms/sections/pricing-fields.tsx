import {
	Controller,
	Control,
	useWatch,
	useFormContext,
	UseFormReturn,
} from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
	TCreateOrderFormValues,
	TUpdateOrderFormValues,
} from "@/features/order/schema/order-form.schema";
import { useEffect } from "react";
import { useGetItem } from "@/entities/item/api/item.query";

type TPricingFieldsProps = {
	form: UseFormReturn<TUpdateOrderFormValues | TCreateOrderFormValues>;
};

export const PricingFields = ({ form }: TPricingFieldsProps) => {
	const itemId = useWatch({
		control: form.control,
		name: "itemId",
	});

	console.log("itemId", itemId);

	const { item, isGettingItem } = useGetItem({ id: itemId });

	console.log("item", item);

	useEffect(() => {
		if (itemId && item) {
			form.reset({
				itemPrice: item.price,
				quantity: 1,
				total: item.price,
				totalCost: item.cost,
			});
		}
	}, [itemId, item]);

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
								{...field}
								onChange={e => field.onChange(Number(e.target.value))}
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
								min={1}
								{...field}
								onChange={e => field.onChange(Number(e.target.value))}
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
								{...field}
								onChange={e => field.onChange(Number(e.target.value))}
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
								{...field}
								onChange={e => field.onChange(Number(e.target.value))}
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
