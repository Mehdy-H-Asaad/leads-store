import React, { useState } from "react"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { X } from "lucide-react"

import { Field, FieldLabel, FieldError } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

type MultiInputFormFieldProps<TFieldValues extends FieldValues> = {
    form: UseFormReturn<TFieldValues>
    name: Path<TFieldValues>
    label: string
}

export const MultiInputFormField = <TFieldValues extends FieldValues>({
    form,
    name,
    label,
}: MultiInputFormFieldProps<TFieldValues>) => {
    return (
        <Controller
            control={form.control}
            name={name}
            render={({ field, fieldState }) => {
                const [inputValue, setInputValue] = useState("")

                const values: string[] = Array.isArray(field.value) ? field.value : []

                const handleAdd = () => {
                    const trimmed = inputValue.trim()
                    if (trimmed && !values.includes(trimmed)) {
                        field.onChange([...values, trimmed])
                        setInputValue("")
                    }
                }

                const handleRemove = (valueToRemove: string) => {
                    field.onChange(values.filter((v) => v !== valueToRemove))
                }

                const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        handleAdd()
                    }
                }

                return (
                    <div className="flex flex-wrap gap-2  min-h-10  border p-2 rounded-md bg-background">
                        <Field>
                            <FieldLabel>{label}</FieldLabel>


                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type and press Enter to add"
                            />

                            {fieldState.invalid && (
                                <FieldError>{fieldState.error?.message}</FieldError>
                            )}
                        </Field>
                        {values.length > 0 && (
                            <div className=" flex flex-wrap gap-2">

                                {values.map((value: string) => (
                                    <div
                                        key={value}
                                        className="max-w-full min-w-0 flex flex-wrap items-center gap-1 bg-muted rounded-md p-2 text-sm"
                                    >
                                        <span className="min-w-0 wrap-break-word whitespace-normal">
                                            {value}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-xs"
                                            className="h-4 w-4 shrink-0 rounded-full hover:bg-destructive/20 hover:text-destructive text-red-500"
                                            onClick={() => handleRemove(value)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
            }}
        />
    )
}
