"use client";

import { Controller, Control } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { SelectFormField } from "@/shared/components/common/select/select-form-field";
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import { ITEM_CATEGORIES } from "../../../constants/item.constants";
import { TItemFormValues } from "../../../schema/item-form.schema";

type TItemClassificationFieldsProps = {
	control: Control<TItemFormValues>;
};

export const ItemClassificationFields = ({
	control,
}: TItemClassificationFieldsProps) => {
	return (
		<div className="grid grid-cols-3 gap-4">
			<Controller
				control={control}
				name="category"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Category</FieldLabel>
						<SelectFormField
							field={field}
							options={ITEM_CATEGORIES.map(cat => ({
								label: cat,
								value: cat,
							}))}
							placeholder="Select category"
						/>
						{fieldState.error && (
							<FieldError>{fieldState.error.message}</FieldError>
						)}
					</Field>
				)}
			/>

			<Controller
				control={control}
				name="status"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>
							Stock Status <span className="text-red-500">*</span>
						</FieldLabel>
						<SelectFormField
							field={field}
							options={Object.values(ITEM_STATUS).map(status => ({
								label: status.split("_").join(" "),
								value: status,
							}))}
							placeholder="Select status"
						/>
						{fieldState.error && (
							<FieldError>{fieldState.error.message}</FieldError>
						)}
					</Field>
				)}
			/>

			<Controller
				control={control}
				name="type"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>
							Type <span className="text-red-500">*</span>
						</FieldLabel>
						<SelectFormField
							field={field}
							options={Object.values(ITEM_TYPE).map(type => ({
								label: type.split("_").join(" "),
								value: type,
							}))}
							placeholder="Select type"
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
