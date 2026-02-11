import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CommandList, CommandEmpty, CommandGroup, CommandItem, Command, CommandInput } from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { Popover } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type TComboboxSelectFormField<
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

export const ComboboxSelectFormField = <
    TFieldValues extends FieldValues,
    TFieldName extends Path<TFieldValues>,
    TValue
>({
    options = [],
    field,
    placeholder = "Select option...",
}: TComboboxSelectFormField<TFieldValues, TFieldName, TValue>) => {
    const handleValueChange = (value: string) => {
        const option = options.find((option) => String(option.value) === value);

        if (option) {
            field.onChange(option.value);
        }
    };

    return (
        <Popover
            modal={false}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between bg-background font-normal capitalize"
                >
                    {field.value
                        ? options.find((option) => option.value === field.value)?.label || placeholder
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0" align="start">
                <Command>
                    <CommandInput />
                    <CommandList
                        onWheelCapture={(e) => e.stopPropagation()}>
                        {options.length === 0 && (
                            <CommandEmpty>
                                No option found.
                            </CommandEmpty>
                        )}
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    className="capitalize"
                                    key={String(option.value)}
                                    value={String(option.value)}
                                    onSelect={handleValueChange}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value === option.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
        // <Select
        //     value={field.value != null ? String(field.value) : ""}
        //     //   value={field.value ? String(field.value) : ""}
        //     onValueChange={handleValueChange}
        // >
        //     <SelectTrigger className="w-full h-11 bg-background">
        //         <SelectValue placeholder={placeholder} />
        //     </SelectTrigger>

        //     <SelectContent>
        //         <SelectGroup>
        //             {label && <SelectLabel>{label}</SelectLabel>}
        //             {options.map((option) => (
        //                 <SelectItem key={String(option.value)} value={String(option.value)}>
        //                     {option.label}
        //                 </SelectItem>
        //             ))}
        //         </SelectGroup>
        //     </SelectContent>
        // </Select>
    );
};