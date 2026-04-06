"use client";

import { Controller, Control } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { TItemFormValues } from "../../../schema/item-form.schema";

type TItemBasicInfoFieldsProps = {
	control: Control<TItemFormValues>;
};

export const ItemBasicInfoFields = ({ control }: TItemBasicInfoFieldsProps) => {
	return (
		<>
			<Controller
				control={control}
				name="name"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>
							Item Name <span className="text-red-500">*</span>
						</FieldLabel>
						<Input
							{...field}
							placeholder="Item Name"
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
				name="description"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Description</FieldLabel>
						<Textarea
							{...field}
							placeholder="Description"
							rows={4}
							value={field.value ?? ""}
							aria-invalid={fieldState.invalid}
						/>
						<div className="text-xs text-muted-foreground">
							{field.value?.length || 0}/500 characters
						</div>
						{fieldState.error && (
							<FieldError>{fieldState.error.message}</FieldError>
						)}
					</Field>
				)}
			/>
		</>
	);
};
