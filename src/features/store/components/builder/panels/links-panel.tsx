"use client";

import { Controller, Control, useFieldArray, useWatch } from "react-hook-form";
import { Field, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import {
	Trash2,
	ExternalLink,
	Download,
	Plus,
	Check,
	Link as LinkIcon,
} from "lucide-react";
import { TStoreFormValues } from "../../../schema/store-form.schema";
import type { TUser } from "@/entities/user/model/user.model";
import {
	PLATFORMS,
	getPlatformByName,
	type TPlatform,
} from "../../../lib/platforms-config";

type LinksPanelProps = {
	control: Control<TStoreFormValues>;
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

	const addedNames = new Set(
		(currentLinks ?? []).map(l => l.name.trim().toLowerCase())
	);

	const addPlatform = (platform: TPlatform) => {
		append({ name: platform.name, url: "" });
	};

	const addCustomLink = () => {
		append({ name: "", url: "" });
	};

	const importFromProfile = () => {
		userLinks.forEach(link => {
			append({ name: link.name, url: link.url });
		});
	};

	return (
		<div className="flex flex-col gap-4">
			<div>
				<p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
					Quick add
				</p>
				<div className="flex flex-wrap gap-1.5">
					{PLATFORMS.map(platform => {
						const isAdded = addedNames.has(platform.name.toLowerCase());
						return (
							<button
								key={platform.id}
								type="button"
								onClick={() => !isAdded && addPlatform(platform)}
								disabled={isAdded}
								title={
									isAdded
										? `${platform.name} already added`
										: `Add ${platform.name}`
								}
								className={cn(
									"flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border border-transparent",
									isAdded
										? "opacity-40 cursor-not-allowed"
										: "hover:scale-[1.04] active:scale-95 cursor-pointer hover:shadow-sm"
								)}
								style={{
									backgroundColor: `${platform.color}18`,
									color: platform.color,
								}}
							>
								{isAdded ? (
									<Check className="size-3 shrink-0" />
								) : (
									<svg
										viewBox="0 0 24 24"
										className="size-3 shrink-0"
										fill="currentColor"
										aria-hidden="true"
									>
										<path d={platform.svgPath} />
									</svg>
								)}
								{platform.name}
							</button>
						);
					})}
				</div>
			</div>

			<div className="border-t" />

			{/* Import from profile banner */}
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

			{/* Empty state */}
			{fields.length === 0 && !canImport && (
				<div className="text-center py-6 text-xs text-muted-foreground border border-dashed rounded-lg">
					Click a platform above or add a custom link.
				</div>
			)}

			{/* Link cards */}
			{fields.map((field, index) => (
				<LinkCard
					key={field.id}
					index={index}
					control={control}
					onRemove={() => remove(index)}
				/>
			))}

			{/* Custom link */}
			<Button
				type="button"
				variant="outline"
				className="w-full gap-2 border-dashed"
				onClick={addCustomLink}
			>
				<Plus className="size-4" />
				Add Custom Link
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
	control: Control<TStoreFormValues>;
	onRemove: () => void;
}) {
	const nameValue = useWatch({ control, name: `links.${index}.name` });
	const platform = getPlatformByName(nameValue ?? "");

	return (
		<div className="flex flex-col gap-2 p-3 border rounded-xl bg-muted/20">
			{/* Header row: icon + name + delete */}
			<div className="flex items-center gap-2">
				{/* Brand icon badge */}
				<div
					className="size-7 rounded-lg flex items-center justify-center shrink-0"
					style={
						platform ? { backgroundColor: `${platform.color}20` } : undefined
					}
				>
					{platform ? (
						<svg
							viewBox="0 0 24 24"
							className="size-4"
							style={{ fill: platform.color }}
							aria-hidden="true"
						>
							<path d={platform.svgPath} />
						</svg>
					) : (
						<LinkIcon className="size-4 text-muted-foreground" />
					)}
				</div>

				{/* Editable name */}
				<Controller
					control={control}
					name={`links.${index}.name`}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							placeholder="Platform name"
							className="h-7 text-sm flex-1 min-w-0"
							aria-invalid={fieldState.invalid}
						/>
					)}
				/>

				{/* Delete */}
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="size-7 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
					onClick={onRemove}
				>
					<Trash2 className="size-3.5" />
				</Button>
			</div>

			{/* URL row */}
			<Controller
				control={control}
				name={`links.${index}.url`}
				render={({ field, fieldState }) => (
					<Field>
						<div className="relative">
							<ExternalLink className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
							<Input
								{...field}
								placeholder={platform?.placeholder ?? "https://..."}
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
