"use client";

import { Controller, Control } from "react-hook-form";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import {
	LAYOUT,
	BUTTON_VARIANT,
	BUTTON_SHAPE,
} from "@/shared/contracts/customization/customization.contract";
import { TCustomizationFormValues } from "../../../schema/customization-form.schema";
import { cn } from "@/shared/lib/utils";
import { LayoutList, LayoutGrid } from "lucide-react";

type LayoutPanelProps = {
	control: Control<TCustomizationFormValues>;
};

const LAYOUTS = [
	{ value: LAYOUT.LIST, label: "List", Icon: LayoutList },
	{ value: LAYOUT.GRID, label: "Grid", Icon: LayoutGrid },
] as const;

const BUTTON_VARIANTS = [
	{ value: BUTTON_VARIANT.FILLED, label: "Filled" },
	{ value: BUTTON_VARIANT.OUTLINE, label: "Outline" },
	{ value: BUTTON_VARIANT.SOFT, label: "Soft" },
] as const;

const BUTTON_SHAPES: {
	value: BUTTON_SHAPE;
	label: string;
	previewClass: string;
}[] = [
	{
		value: BUTTON_SHAPE.ROUNDED,
		label: "Rounded",
		previewClass: "rounded-xl",
	},
	{
		value: BUTTON_SHAPE.PILL,
		label: "Pill",
		previewClass: "rounded-full",
	},
	{
		value: BUTTON_SHAPE.SQUARE,
		label: "Square",
		previewClass: "rounded-sm",
	},
];

export function LayoutPanel({ control }: LayoutPanelProps) {
	return (
		<div className="flex flex-col gap-6">
			{/* Layout */}
			<Controller
				control={control}
				name="config.layout"
				render={({ field }) => (
					<Field>
						<FieldLabel>Link Layout</FieldLabel>
						<div className="grid grid-cols-2 gap-2 mt-1">
							{LAYOUTS.map(({ value, label, Icon }) => (
								<button
									key={value}
									type="button"
									onClick={() => field.onChange(value)}
									className={cn(
										"flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all",
										field.value === value
											? "border-primary bg-primary/5"
											: "border-border hover:border-muted-foreground/30"
									)}
								>
									<Icon
										className={cn(
											"size-6",
											field.value === value
												? "text-primary"
												: "text-muted-foreground"
										)}
									/>
									<span
										className={cn(
											"text-sm font-medium",
											field.value === value
												? "text-primary"
												: "text-muted-foreground"
										)}
									>
										{label}
									</span>
								</button>
							))}
						</div>
					</Field>
				)}
			/>

			{/* Button Style */}
			<Controller
				control={control}
				name="config.buttonVariant"
				render={({ field }) => (
					<Field>
						<FieldLabel>Button Style</FieldLabel>
						<div className="grid grid-cols-3 gap-2 mt-1">
							{BUTTON_VARIANTS.map(({ value, label }) => (
								<button
									key={value}
									type="button"
									onClick={() => field.onChange(value)}
									className={cn(
										"flex items-center justify-center py-3 px-2 rounded-xl border-2 text-sm font-medium transition-all",
										field.value === value
											? "border-primary bg-primary/5 text-primary"
											: "border-border text-muted-foreground hover:border-muted-foreground/30"
									)}
								>
									{label}
								</button>
							))}
						</div>
					</Field>
				)}
			/>

			{/* Button Shape */}
			<Controller
				control={control}
				name="config.buttonShape"
				render={({ field }) => (
					<Field>
						<FieldLabel>Button Shape</FieldLabel>
						<div className="grid grid-cols-3 gap-2 mt-1">
							{BUTTON_SHAPES.map(({ value, label, previewClass }) => (
								<button
									key={value}
									type="button"
									onClick={() => field.onChange(value)}
									className={cn(
										"flex flex-col items-center gap-2.5 p-3 border-2 rounded-xl transition-all",
										field.value === value
											? "border-primary bg-primary/5"
											: "border-border hover:border-muted-foreground/30"
									)}
								>
									{/* Visual preview of the shape */}
									<div
										className={cn(
											"w-full h-6 border-2 transition-all",
											previewClass,
											field.value === value
												? "border-primary bg-primary/20"
												: "border-muted-foreground/40 bg-muted/30"
										)}
									/>
									<span
										className={cn(
											"text-xs font-medium",
											field.value === value
												? "text-primary"
												: "text-muted-foreground"
										)}
									>
										{label}
									</span>
								</button>
							))}
						</div>
					</Field>
				)}
			/>
		</div>
	);
}
