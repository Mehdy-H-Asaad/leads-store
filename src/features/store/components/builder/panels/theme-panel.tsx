"use client";

import { Controller, useWatch, UseFormReturn } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
	FONT,
	FONT_VALUES,
	BACKGROUND_TYPE,
} from "@/shared/contracts/store/store.contract";
import { TStoreFormValues } from "../../../schema/store-form.schema";
import { cn } from "@/shared/lib/utils";
import { ImageIcon, PaletteIcon } from "lucide-react";
import { StoreBackgroundSection } from "../store-background";
import { useFileUpload } from "@/shared/hooks/use-file-upload";

type ThemePanelProps = {
	form: UseFormReturn<TStoreFormValues>;
	backgroundUpload: ReturnType<typeof useFileUpload>;
};

const FONT_LABELS: Record<FONT, string> = {
	[FONT.INTER]: "Inter",
	[FONT.ROBOTO]: "Roboto",
	[FONT.POPPINS]: "Poppins",
	[FONT.MONTSERRAT]: "Montserrat",
	// [FONT.SEKUYA]: "Sekuya",
	[FONT.RUBIK]: "Rubik",
	[FONT.ARCHIVO_BLACK]: "Archivo Black",
	[FONT.LATO]: "Lato",
};

const FONT_FAMILY_MAP: Record<FONT, string> = {
	[FONT.INTER]: "var(--font-inter), Inter, sans-serif",
	[FONT.ROBOTO]: "var(--font-roboto), Roboto, sans-serif",
	[FONT.POPPINS]: "var(--font-poppins), Poppins, sans-serif",
	[FONT.MONTSERRAT]: "var(--font-montserrat), Montserrat, sans-serif",
	// [FONT.SEKUYA]: "var(--font-sekuya), Sekuya, sans-serif",
	[FONT.RUBIK]: "var(--font-rubik), Rubik, sans-serif",
	[FONT.ARCHIVO_BLACK]: "var(--font-archivo-black), Archivo Black, sans-serif",
	[FONT.LATO]: "var(--font-lato), Lato, sans-serif",
};

export function ThemePanel({ form, backgroundUpload }: ThemePanelProps) {
	const backgroundType = useWatch({
		control: form.control,
		name: "config.theme.backgroundType",
	});

	return (
		<div className="flex flex-col gap-6">
			{/* Colors */}
			<div className="flex flex-col gap-4">
				<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
					Colors
				</p>

				{/* Accent */}
				<Controller
					control={form.control}
					name="config.theme.primary"
					render={({ field, fieldState }) => (
						<Field orientation="horizontal">
							<FieldLabel className="text-sm">Accent / Primary</FieldLabel>
							<div className="flex items-center gap-2">
								<input
									type="color"
									value={field.value}
									onChange={e => field.onChange(e.target.value)}
									className="w-9 h-9 rounded-lg cursor-pointer border border-border bg-transparent p-0.5"
								/>
								<Input
									value={field.value}
									onChange={e => field.onChange(e.target.value)}
									className="w-28 h-9 text-xs font-mono uppercase"
									maxLength={7}
									aria-invalid={fieldState.invalid}
								/>
							</div>
							{fieldState.error && (
								<FieldError>{fieldState.error.message}</FieldError>
							)}
						</Field>
					)}
				/>

				{/* Background */}
				<div className="flex flex-col gap-2">
					<FieldLabel className="text-sm">Background</FieldLabel>

					{/* Type toggle */}
					<Controller
						control={form.control}
						name="config.theme.backgroundType"
						render={({ field }) => (
							<div className="flex rounded-lg border overflow-hidden">
								<button
									type="button"
									onClick={() => field.onChange(BACKGROUND_TYPE.COLOR)}
									className={cn(
										"flex flex-1 items-center justify-center gap-1.5 py-2 text-xs font-medium transition-all",
										field.value === BACKGROUND_TYPE.COLOR
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground hover:bg-muted/50"
									)}
								>
									<PaletteIcon className="size-3.5" />
									Color
								</button>
								<button
									type="button"
									onClick={() => field.onChange(BACKGROUND_TYPE.IMAGE)}
									className={cn(
										"flex flex-1 items-center justify-center gap-1.5 py-2 text-xs font-medium transition-all",
										field.value === BACKGROUND_TYPE.IMAGE
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground hover:bg-muted/50"
									)}
								>
									<ImageIcon className="size-3.5" />
									Image
								</button>
							</div>
						)}
					/>

					{backgroundType === BACKGROUND_TYPE.COLOR ? (
						<Controller
							control={form.control}
							name="config.theme.background"
							render={({ field, fieldState }) => (
								<div className="flex items-center gap-2">
									<input
										type="color"
										value={field.value}
										onChange={e => field.onChange(e.target.value)}
										className="w-9 h-9 rounded-lg cursor-pointer border border-border bg-transparent p-0.5"
									/>
									<Input
										value={field.value}
										onChange={e => field.onChange(e.target.value)}
										className="flex-1 h-9 text-xs font-mono uppercase"
										maxLength={7}
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.error && (
										<FieldError>{fieldState.error.message}</FieldError>
									)}
								</div>
							)}
						/>
					) : (
						<StoreBackgroundSection
							form={form}
							backgroundUpload={backgroundUpload}
						/>
					)}
				</div>

				{/* Text color */}
				<Controller
					control={form.control}
					name="config.theme.text"
					render={({ field, fieldState }) => (
						<Field orientation="horizontal">
							<FieldLabel className="text-sm">Text</FieldLabel>
							<div className="flex items-center gap-2">
								<input
									type="color"
									value={field.value}
									onChange={e => field.onChange(e.target.value)}
									className="w-9 h-9 rounded-lg cursor-pointer border border-border bg-transparent p-0.5"
								/>
								<Input
									value={field.value}
									onChange={e => field.onChange(e.target.value)}
									className="w-28 h-9 text-xs font-mono uppercase"
									maxLength={7}
									aria-invalid={fieldState.invalid}
								/>
							</div>
							{fieldState.error && (
								<FieldError>{fieldState.error.message}</FieldError>
							)}
						</Field>
					)}
				/>
			</div>

			{/* Typography */}
			<div className="flex flex-col gap-4">
				<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
					Typography
				</p>
				<Controller
					control={form.control}
					name="config.theme.font"
					render={({ field }) => (
						<Field>
							<FieldLabel>Font Family</FieldLabel>
							<div className="grid grid-cols-2 gap-2">
								{FONT_VALUES.map(font => (
									<button
										key={font}
										type="button"
										onClick={() => field.onChange(font)}
										className={cn(
											"px-3 py-2 rounded-lg border  transition-all text-left",
											field.value === font
												? "border-primary bg-primary/5 text-primary font-medium"
												: "border-border text-muted-foreground hover:border-muted-foreground/40"
										)}
										style={{ fontFamily: FONT_FAMILY_MAP[font] }}
									>
										{FONT_LABELS[font]}
									</button>
								))}
							</div>
						</Field>
					)}
				/>
			</div>
		</div>
	);
}
