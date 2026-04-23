import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxList,
	ComboboxItem,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxValue,
	ComboboxChip,
} from "@/shared/components/ui/combobox";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type Option<TValue> = { label: string; value: TValue };

type TComboboxMultiSelectFieldProps<
	TFieldValues extends FieldValues,
	TFieldName extends Path<TFieldValues>,
	TValue
> = {
	options: Option<TValue>[];
	placeholder?: string;
	value: TValue[];
	field: ControllerRenderProps<TFieldValues, TFieldName>;
};

export const ComboboxMultiSelectField = <
	TFieldValues extends FieldValues,
	TFieldName extends Path<TFieldValues>,
	TValue
>({
	options,
	placeholder,
	value,
	field,
}: TComboboxMultiSelectFieldProps<TFieldValues, TFieldName, TValue>) => {
	const selectedOptions = options.filter(opt => value.includes(opt.value));

	return (
		<Combobox
			multiple
			autoHighlight
			value={selectedOptions}
			onValueChange={(newSelected: Option<TValue>[]) => {
				field.onChange(newSelected.map(o => o.value));
			}}
			items={options}
			itemToStringValue={(option: Option<TValue>) => option.label}
		>
			<ComboboxChips>
				<ComboboxValue>
					{(values: Option<TValue>[]) => (
						<>
							{values.map(option => (
								<ComboboxChip key={String(option.value)}>
									{option.label}
								</ComboboxChip>
							))}
							<ComboboxChipsInput placeholder={placeholder} />
						</>
					)}
				</ComboboxValue>
			</ComboboxChips>
			<ComboboxContent>
				<ComboboxEmpty>No items found.</ComboboxEmpty>
				<ComboboxList>
					{(option: Option<TValue>) => (
						<ComboboxItem
							key={String(option.value)}
							value={String(option.value)}
						>
							{option.label}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
};
