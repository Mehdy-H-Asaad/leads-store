import { cn } from "@/shared/lib/utils";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/shared/components/ui/popover";
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from "@/shared/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";

type TComboboxSelectOption<TValue> = {
	value: TValue;
	label: string;
};

type ComboboxSelectProps<TValue extends string | number> = {
	options: TComboboxSelectOption<TValue>[];
	placeholder?: string;
	value?: TValue | null;
	onChange?: (value: TValue | null) => void;
};

export const ComboboxSelect = <TValue extends string | number>({
	options,
	placeholder = "Select option...",
	value,
	onChange,
}: ComboboxSelectProps<TValue>) => {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState<TValue | null>(
		value ?? null
	);

	useEffect(() => {
		setSelectedValue(value ?? null);
	}, [value]);

	const handleSelect = (currentValue: string) => {
		const selected = options.find(
			option => String(option.value) === currentValue
		);
		const newValue = selected?.value ?? null;
		setSelectedValue(newValue);
		onChange?.(newValue);
		setOpen(false);
	};

	const displayValue =
		options.find(option => option.value === selectedValue)?.label ||
		placeholder;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between capitalize"
				>
					{displayValue}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder={placeholder} className="h-9" />
					<CommandList>
						{options.length === 0 && (
							<CommandEmpty>No option found.</CommandEmpty>
						)}
						<CommandGroup>
							{options.map(option => (
								<CommandItem
									className="capitalize"
									key={String(option.value)}
									value={String(option.value)}
									onSelect={handleSelect}
								>
									{option.label}
									<Check
										className={cn(
											"ml-auto",
											selectedValue === option.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
