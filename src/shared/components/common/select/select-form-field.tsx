import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from "@/shared/components/ui/select";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type TSelectFormField<
	TFieldValues extends FieldValues,
	TFieldName extends Path<TFieldValues>,
	TValue
> = {
	options: {
		label: string;
		value: TValue;
	}[];
	placeholder?: string;
	label?: string;
	field: ControllerRenderProps<TFieldValues, TFieldName>;
};

export const SelectFormField = <
	TFieldValues extends FieldValues,
	TFieldName extends Path<TFieldValues>,
	TValue
>({
	options,
	field,
	placeholder = "Select option...",
	label,
}: TSelectFormField<TFieldValues, TFieldName, TValue>) => {
	const handleValueChange = (value: string) => {
		const option = options.find(option => String(option.value) === value);

		if (option) {
			field.onChange(option.value);
		}
	};

	return (
		<Select
			//   value={field.value ? String(field.value) : ""}

			value={field.value != null ? String(field.value) : ""}
			onValueChange={handleValueChange}
		>
			<SelectTrigger className="w-full h-11 bg-background capitalize">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>

			<SelectContent>
				<SelectGroup>
					{label && <SelectLabel>{label}</SelectLabel>}
					{options.map(option => (
						<SelectItem
							className="capitalize"
							key={String(option.value)}
							value={String(option.value)}
						>
							{option.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
