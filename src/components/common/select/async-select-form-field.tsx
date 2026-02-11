import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMemo, useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useDebounce } from "@/hooks/use-debounce";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type TAsyncSelectOption<TValue> = {
    value: TValue;
    label: string;
};

type AsyncSelectFormFieldProps<
    TFieldValues extends FieldValues,
    TFieldName extends Path<TFieldValues>
> = {
    form: UseFormReturn<TFieldValues>;
    name: TFieldName;
    options: TAsyncSelectOption<TFieldValues[TFieldName]>[];
    placeholder?: string;
    defaultLabel?: string;
    label?: string;
    isLoading?: boolean;
    onSearch?: (searchValue: string) => void;
    searchDebounceDelay?: number;
    isRequired?: boolean;
};

export const AsyncSelectFormField = <
    TFieldValues extends FieldValues,
    TFieldName extends Path<TFieldValues>
>({
    form,
    name,
    options,
    isLoading,
    isRequired = false,
    placeholder = "Select option...",
    defaultLabel,
    label,
    onSearch,
    searchDebounceDelay = 300,
}: AsyncSelectFormFieldProps<TFieldValues, TFieldName>) => {
    const [open, setOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const optionsMap = useMemo(() => {
        const map = new Map<TFieldValues[TFieldName], string>();
        for (const option of options) {
            map.set(option.value, option.label);
        }
        return map;
    }, [options]);

    const debouncedSearch = useDebounce({
        callback: (value: string) => onSearch?.(value),
        delay: searchDebounceDelay,
    });

    const handleSearch = (value: string) => {
        setSearchValue(value);
        debouncedSearch(value);
    };

    return (
        <Controller
            control={form.control}
            name={name}
            render={({ field, fieldState }) => (
                <Field className="flex flex-col flex-1">
                    {label && <FieldLabel>{label}{isRequired && <span className="text-red-500">*</span>}</FieldLabel>}
                    <Popover
                        open={open}
                        onOpenChange={(open) => {
                            setOpen(open);
                            if (!open) {
                                setSearchValue("");
                            }
                        }}
                    >
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between bg-background font-normal"
                            >
                                {field.value
                                    ? optionsMap.get(field.value) || defaultLabel || placeholder
                                    : placeholder}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                            <Command shouldFilter={false}>
                                <CommandInput
                                    value={searchValue}
                                    onValueChange={handleSearch}
                                    placeholder={placeholder}
                                    className="h-9"
                                />
                                <CommandList>
                                    {options.length === 0 && (
                                        <CommandEmpty>
                                            {isLoading ? (
                                                <Loader2 className="animate-spin w-4 h-4 text-center mx-auto" />
                                            ) : (
                                                "No option found."
                                            )}
                                        </CommandEmpty>
                                    )}
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                key={String(option.value)}
                                                value={String(option.value)}
                                                onSelect={() => {
                                                    field.onChange(option.value);
                                                    setOpen(false);
                                                    setSearchValue("");
                                                }}
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
                    {fieldState.invalid && <FieldError>{fieldState.error?.message}</FieldError>}
                </Field>
            )}
        />
    );
};