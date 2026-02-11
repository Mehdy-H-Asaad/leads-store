"use client"

import * as React from "react"
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox"
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form"

type Option<TValue> = { label: string; value: TValue }

type TMultiSelect<
    TFieldValues extends FieldValues,
    TFieldName extends Path<TFieldValues>,
    TValue
> = {
    options: Option<TValue>[]
    placeholder?: string
    field: ControllerRenderProps<TFieldValues, TFieldName>
}

export function MultiSelect<
    TFieldValues extends FieldValues,
    TFieldName extends Path<TFieldValues>,
    TValue
>({ options, field, placeholder = "Select option..." }: TMultiSelect<TFieldValues, TFieldName, TValue>) {
    const anchor = useComboboxAnchor()

    const selectedOptions =
        !field.value || !Array.isArray(field.value) ? [] : options.filter((opt) => field.value.includes(opt.value))

    return (
        <Combobox
            multiple
            items={options}
            value={selectedOptions}
            onValueChange={(newSelected: Option<TValue>[]) => {
                field.onChange(newSelected.map((o) => o.value))
            }}
            autoHighlight
        >
            <ComboboxChips ref={anchor} className="w-full">
                <ComboboxValue>
                    {(values: Option<TValue>[]) => (
                        <React.Fragment>
                            {values.map((option) => (
                                <ComboboxChip key={String(option.value)}>
                                    {option.label}
                                </ComboboxChip>
                            ))}
                            <ComboboxChipsInput placeholder={placeholder} />
                        </React.Fragment>
                    )}
                </ComboboxValue>
            </ComboboxChips>

            <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(item: Option<TValue>) => (
                        <ComboboxItem key={String(item.value)} value={item}>
                            {item.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}
