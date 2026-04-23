"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { SelectFormField } from "@/shared/components/common/select/select-form-field";
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import { TItemFormValues } from "../../../schema/item-form.schema";
import { useGetCategories } from "@/entities/category/api/category.query";
import { useState } from "react";
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
import { Loader2 } from "lucide-react";
import React from "react";
import { useDebounce } from "@/shared/hooks/use-debounce";

type TItemClassificationFieldsProps = {
	form: UseFormReturn<TItemFormValues>;
};

export const ItemClassificationFields = ({
	form,
}: TItemClassificationFieldsProps) => {
	const [categorySearch, setCategorySearch] = useState("");
	const [debouncedCategorySearch, setDebouncedCategorySearch] = useState("");
	const anchor = useComboboxAnchor();
	const { categories, isGettingCategories } = useGetCategories({
		page: 1,
		limit: 30,
		filters: {
			name: debouncedCategorySearch,
		},
	});

	const debouncedSetCategorySearch = useDebounce({
		callback: setDebouncedCategorySearch,
		delay: 500,
	});

	const handleCategorySearch = (value: string) => {
		setCategorySearch(value);
		debouncedSetCategorySearch(value);
	};

	type TCategoryOption = {
		id: string;
		name: string;
	};

	const categoryOptions: TCategoryOption[] =
		categories?.map(category => ({
			id: category.id,
			name: category.name,
		})) ?? [];

	return (
		<div className="grid grid-cols-3 gap-4">
			<Controller
				control={form.control}
				name="categories"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Category</FieldLabel>
						<Combobox
							multiple
							autoHighlight
							value={field.value}
							onValueChange={values => {
								field.onChange(values);
								setCategorySearch("");
							}}
							items={categoryOptions}
							itemToStringValue={(item: TCategoryOption) => item.name}
							isItemEqualToValue={(
								objectA: TCategoryOption,
								objectB: TCategoryOption
							) => objectA.id === objectB.id}
						>
							<ComboboxChips ref={anchor} className="w-full max-w-xs">
								<ComboboxValue>
									{(values: TCategoryOption[]) => (
										<React.Fragment>
											{values.map(value => (
												<ComboboxChip key={value.id}>{value.name}</ComboboxChip>
											))}
											<ComboboxChipsInput
												value={categorySearch}
												onChange={e => handleCategorySearch(e.target.value)}
												placeholder="Select category"
											/>
										</React.Fragment>
									)}
								</ComboboxValue>
							</ComboboxChips>
							<ComboboxContent anchor={anchor}>
								<ComboboxEmpty>
									{isGettingCategories ? (
										<Loader2 className="w-4 h-4 animate-spin mx-auto" />
									) : (
										"No categories found"
									)}
								</ComboboxEmpty>
								<ComboboxList>
									{(item: TCategoryOption) => (
										<ComboboxItem key={item.id} value={item}>
											{item.name}
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
