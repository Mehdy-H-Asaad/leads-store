"use client";

import { Controller, Control } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { ImagePlus, Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { TItemFormValues } from "../../../schema/item-form.schema";

type TItemGalleryUploadProps = {
	control: Control<TItemFormValues>;
	isUploading: boolean;
	onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ItemGalleryUpload = ({
	control,
	isUploading,
	onUpload,
}: TItemGalleryUploadProps) => {
	return (
		<Controller
			control={control}
			name="images"
			render={({ fieldState }) => (
				<Field>
					<FieldLabel>Item Gallery</FieldLabel>
					{isUploading ? (
						<div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg border-input gap-2">
							<Loader2 className="w-7 h-7 text-muted-foreground animate-spin" />
							<p className="text-sm text-muted-foreground">Uploading...</p>
						</div>
					) : (
						<label
							htmlFor="gallery-images"
							className={cn(
								"flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:bg-muted/50 hover:border-primary/50",
								fieldState.invalid ? "border-destructive" : "border-input"
							)}
						>
							<ImagePlus className="w-7 h-7 mb-2 text-muted-foreground" />
							<p className="text-sm text-muted-foreground">Add images</p>
							<input
								id="gallery-images"
								type="file"
								className="hidden"
								accept="image/*"
								multiple
								onChange={onUpload}
							/>
						</label>
					)}
					{fieldState.error && (
						<FieldError>{fieldState.error.message}</FieldError>
					)}
				</Field>
			)}
		/>
	);
};
