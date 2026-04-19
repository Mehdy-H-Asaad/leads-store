"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { SelectFormField } from "@/shared/components/common/select/select-form-field";
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import { TCreateItemFormValues } from "../../../schema/item-form.schema";
import {
	useGetCategories,
	useGetCategory,
} from "@/entities/category/api/category.query";
import { RefObject, useState } from "react";
import { ComboboxMultiSelectField } from "@/shared/components/common/select/combobox-multi-select-field";
import {
	Combobox,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	ComboboxChip,
} from "@/shared/components/ui/combobox";
import { useComboboxAnchor } from "@/shared/components/ui/combobox";

type TItemClassificationFieldsProps = {
	form: UseFormReturn<TCreateItemFormValues>;
};

export const ItemClassificationFields = ({
	form,
}: TItemClassificationFieldsProps) => {
	const [categorySearch, setCategorySearch] = useState("");
	const anchor = useComboboxAnchor();
	const { categories, isGettingCategories } = useGetCategories({
		page: 1,
		limit: 2,
		filters: {
			name: categorySearch,
		},
	});

	const handleCategorySearch = (searchValue: string) => {
		setCategorySearch(searchValue);
	};

	type TCategoryOption = {
		value: string;
		label: string;
	};

	const categoryOptions: TCategoryOption[] =
		categories?.map(category => ({
			value: category.id,
			label: category.name,
		})) ?? ([] as TCategoryOption[]);

	return (
		<div className="grid grid-cols-3 gap-4">
			<Controller
				control={form.control}
				name="categories"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>
							Category <span className="text-red-500">*</span>
						</FieldLabel>
						<Combobox
							multiple
							autoHighlight
							items={categoryOptions}
							value={field.value?.map(id =>
								categoryOptions.find(option => option.value === id)
							)}
							onValueChange={(newSelected: (TCategoryOption | undefined)[]) => {
								field.onChange(newSelected.map(o => o?.value) ?? []);
							}}
							// defaultValue={[categoryOptions[0]]}
						>
							<ComboboxChips className="w-full max-w-xs">
								<ComboboxValue>
									{(values: TCategoryOption[]) => (
										<>
											{values.map((value: TCategoryOption) => (
												<ComboboxChip key={value.value}>
													{value.label}
												</ComboboxChip>
											))}
											<ComboboxChipsInput />
										</>
									)}
								</ComboboxValue>
							</ComboboxChips>
							<ComboboxContent
								onWheel={e => e.stopPropagation()}
								className="pointer-events-auto"
								anchor={anchor}
							>
								<ComboboxEmpty>No items found.</ComboboxEmpty>
								<ComboboxList>
									{(item: TCategoryOption) => (
										<ComboboxItem key={item.value} value={item}>
											{item.label}
										</ComboboxItem>
									)}
								</ComboboxList>
							</ComboboxContent>
						</Combobox>
						{fieldState.error && (
							<FieldError>{fieldState.error.message}</FieldError>
						)}
					</Field>
				)}
			/>

			<Controller
				control={form.control}
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
				control={form.control}
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
