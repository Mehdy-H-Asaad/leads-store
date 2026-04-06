"use client";

import { Controller, Control, useFieldArray, useWatch } from "react-hook-form";
import { Field, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import {
	Plus,
	Trash2,
	GripVertical,
	ExternalLink,
	Download,
} from "lucide-react";
import { TCustomizationFormValues } from "../../../schema/customization-form.schema";

import type { TUser } from "@/entities/user/model/user.model";

type LinksPanelProps = {
	control: Control<TCustomizationFormValues>;
	user?: TUser | null;
};

export function LinksPanel({ control, user }: LinksPanelProps) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: "links",
	});

	const currentLinks = useWatch({ control, name: "links" });

	const userLinks = user?.links ?? [];
	const canImport = userLinks.length > 0 && (currentLinks ?? []).length === 0;

	const addLink = () => {
		append({
			name: "",
			url: "",
		});
	};

	const importFromProfile = () => {
		userLinks.forEach(link => {
			append({
				name: link.name,
				url: link.url,
			});
		});
	};

	return (
		<div className="flex flex-col gap-3">
			{/* Import banner */}
			{canImport && (
				<button
					type="button"
					onClick={importFromProfile}
					className="flex items-center gap-2 w-full p-3 rounded-xl border border-dashed border-primary/50 bg-primary/5 text-primary hover:bg-primary/10 transition-colors text-left"
				>
					<Download className="size-4 shrink-0" />
					<div>
						<p className="text-xs font-semibold">Import from your profile</p>
						<p className="text-[11px] opacity-70">
							{userLinks.length} link{userLinks.length > 1 ? "s" : ""} found in
							Settings
						</p>
					</div>
				</button>
			)}

			{fields.length === 0 && !canImport && (
				<div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-lg">
					No links yet. Add your first one below.
				</div>
			)}

			{fields.map((field, index) => (
				<LinkCard
					key={field.id}
					index={index}
					control={control}
					onRemove={() => remove(index)}
				/>
			))}

			<Button
				type="button"
				variant="outline"
				className="w-full gap-2 border-dashed"
				onClick={addLink}
			>
				<Plus className="size-4" />
				Add Link
			</Button>
		</div>
	);
}

function LinkCard({
	index,
	control,
	onRemove,
}: {
	index: number;
	control: Control<TCustomizationFormValues>;
	onRemove: () => void;
}) {
	return (
		<div className="flex flex-col gap-2 p-3 border rounded-xl bg-muted/20">
			{/* Card header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<GripVertical className="size-4 text-muted-foreground cursor-grab" />
					<span className="text-xs font-medium text-muted-foreground">
						Link {index + 1}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<Controller
						control={control}
						name={`links.${index}.name`}
						render={({ field, fieldState }) => (
							<Input
								{...field}
								placeholder="Title (e.g. GitHub)"
								className="h-8 text-sm"
								aria-invalid={fieldState.invalid}
							/>
						)}
					/>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className={cn(
							"size-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
						)}
						onClick={onRemove}
					>
						<Trash2 className="size-3.5" />
					</Button>
				</div>
			</div>

			{/* URL */}
			<Controller
				control={control}
				name={`links.${index}.url`}
				render={({ field, fieldState }) => (
					<Field>
						<div className="relative">
							<ExternalLink className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
							<Input
								{...field}
								placeholder="https://..."
								className="h-8 text-sm pl-8"
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
	);
}
