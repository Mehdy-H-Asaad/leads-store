"use client";

import { Controller, Control, useWatch } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Button } from "@/shared/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { TItemFormValues } from "../../../schema/item-form.schema";

type TItemThumbnailUploadProps = {
	control: Control<TItemFormValues>;
	preview: string | null;
	isUploading: boolean;
	// existingThumbnailUrl?: string | null;
	onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onDelete: () => void;
};

export const ItemThumbnailUpload = ({
	control,
	preview,
	isUploading,
	// existingThumbnailUrl,
	onUpload,
	onDelete,
}: TItemThumbnailUploadProps) => {
	const thumbnailUrl =
		useWatch({ control, name: "thumbnail" })?.url ?? preview ?? null;

	return (
		<Controller
			control={control}
			name="thumbnail"
			render={({ fieldState }) => (
				<Field>
					<FieldLabel>Featured Image</FieldLabel>

					{isUploading ? (
						<div className="relative w-full h-40 rounded-lg overflow-hidden border flex items-center justify-center gap-2">
							<Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
							<p className="text-sm text-muted-foreground">Uploading...</p>
						</div>
					) : thumbnailUrl ? (
						<div className="relative w-full h-40 rounded-lg overflow-hidden border">
							<Image
								src={thumbnailUrl}
								alt="Featured preview"
								className="w-full h-full object-cover"
								width={160}
								height={160}
							/>
							<Button
								type="button"
								variant="destructive"
								size="icon"
								className="absolute top-2 right-2 h-7 w-7 rounded-full"
								onClick={onDelete}
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					) : !thumbnailUrl ? (
						<label
							htmlFor="featured-image"
							className={cn(
								"flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:bg-muted/50 hover:border-primary/50",
								fieldState.invalid ? "border-destructive" : "border-input"
							)}
						>
							<Upload className="w-8 h-8 mb-2 text-muted-foreground" />
							<p className="text-sm text-muted-foreground">Click to upload</p>
							<p className="text-xs text-muted-foreground">
								PNG, JPG, WEBP (MAX. 5MB)
							</p>
							<input
								id="featured-image"
								type="file"
								className="hidden"
								accept="image/*"
								onChange={onUpload}
							/>
						</label>
					) : (
						<div className="relative w-full h-40 rounded-lg overflow-hidden border flex items-center justify-center gap-2">
							<p className="text-sm text-muted-foreground">No image uploaded</p>
						</div>
					)}

					{fieldState.error && (
						<FieldError>{fieldState.error.message}</FieldError>
					)}
				</Field>
			)}
		/>
	);
};
