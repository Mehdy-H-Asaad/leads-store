"use client";

import { Controller, Control } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { TItemFormValues } from "../../../schema/item-form.schema";

type TItemPricingFieldsProps = {
	control: Control<TItemFormValues>;
};

export const ItemPricingFields = ({ control }: TItemPricingFieldsProps) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			<Controller
				control={control}
				name="price"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>
							Price <span className="text-red-500">*</span>
						</FieldLabel>
						<Input
							{...field}
							type="number"
							placeholder="Price"
							value={field.value ?? ""}
							onChange={e =>
								field.onChange(
									e.target.value ? parseFloat(e.target.value) : undefined
								)
							}
							aria-invalid={fieldState.invalid}
						/>
						{fieldState.error && (
							<FieldError>{fieldState.error.message}</FieldError>
						)}
					</Field>
				)}
			/>

			<Controller
				control={control}
				name="cost"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Cost</FieldLabel>
						<Input
							{...field}
							type="number"
							placeholder="Cost"
							value={field.value ?? ""}
							onChange={e =>
								field.onChange(
									e.target.value ? parseFloat(e.target.value) : undefined
								)
							}
							aria-invalid={fieldState.invalid}
						/>
						{fieldState.error && (
							<FieldError>{fieldState.error.message}</FieldError>
						)}
					</Field>
				)}
			/>
		</div>
	);
};
