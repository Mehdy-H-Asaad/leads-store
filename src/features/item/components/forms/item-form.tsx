"use client";

import { Controller, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/shared/components/ui/sheet";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Switch } from "@/shared/components/ui/switch";
import { MainButton } from "@/shared/components/common/main-button";
import { SelectFormField } from "@/shared/components/common/select/select-form-field";
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import { ITEM_CATEGORIES } from "../../constants/item.constants";
import { ImagePlus, X, Upload, PlusIcon, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";
import { Label } from "@/shared/components/ui/label";
import { useCreateItem } from "../../hooks/use-create-item";
import { useUpdateItem } from "../../hooks/use-update-item";
import { E_S3_PATH } from "@/shared/hooks/use-upload-s3";
import { useFileUpload } from "@/shared/hooks/use-file-upload";
import Image from "next/image";
import { TItem } from "@/entities/item/model/item.model";
import { useDeleteThumbnail } from "../../hooks/use-delete-thumbnail";

type TItemFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	item?: TItem;
};

export const ItemForm = ({ open, onOpenChange, item }: TItemFormProps) => {
	const isEditMode = !!item;

	const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
	const [attributeName, setAttributeName] = useState("");
	const [attributeValue, setAttributeValue] = useState("");

	const thumbnailUpload = useFileUpload({ maxSizeMB: 5 });

	const handleClose = () => {
		onOpenChange(false);
		thumbnailUpload.clearPreview();
		setGalleryPreviews([]);
		setAttributeName("");
		setAttributeValue("");
	};

	const { CreateItemForm, onCreateItem, isCreatingItem } = useCreateItem({
		onSuccess: handleClose,
	});
	const { UpdateItemForm, onUpdateItem, isUpdatingItem } = useUpdateItem({
		item,
		onSuccess: handleClose,
	});

	const form = isEditMode ? UpdateItemForm : CreateItemForm;
	const onSubmit = isEditMode ? onUpdateItem : onCreateItem;
	const isSubmitting = isEditMode ? isUpdatingItem : isCreatingItem;
	const { deleteThumbnail, isDeletingThumbnail } = useDeleteThumbnail();
	const {
		fields,
		append: appendAttribute,
		remove: removeAttribute,
	} = useFieldArray({
		control: form.control,
		name: "attributes",
	});

	const {
		fields: itemGalleryFields,
		append: appendItemGallery,
		remove: removeItemGallery,
	} = useFieldArray({
		control: form.control,
		name: "images",
	});

	useEffect(() => {
		if (isEditMode && item) {
			if (item.thumbnail?.url) {
				thumbnailUpload.clearPreview();
			}
			if (item.images && item.images.length > 0) {
				setGalleryPreviews(item.images.map(img => img.fileUrl));
			}
		} else {
			thumbnailUpload.clearPreview();
			setGalleryPreviews([]);
		}
	}, [isEditMode, item, open]);

	const handleThumbnailUpload = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		await thumbnailUpload.uploadFile({
			file,
			path: E_S3_PATH.ITEM_THUMBNAIL,
			form,
			fieldName: "thumbnail",
		});
	};

	const handleDeleteThumbnail = () => {
		thumbnailUpload.removeFile(form, "thumbnail");
		if (item?.id) {
			deleteThumbnail(item.id);
		}
	};

	const handleGalleryImagesUpload = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = Array.from(e.target.files || []);

		for (const file of files) {
			if (file.size > 5 * 1024 * 1024) {
				toast.error("Image too large", {
					description: `${file.name} is too large. Maximum size is 5MB`,
				});
				return;
			}
			if (!file.type.startsWith("image/")) {
				toast.error("Invalid file type", {
					description: `${file.name} is not a valid image file`,
				});
				return;
			}
		}

		let uploadedCount = 0;
		files.forEach(file => {
			const reader = new FileReader();
			reader.onloadend = () => {
				const result = reader.result as string;
				setGalleryPreviews(prev => [...prev, result]);
				appendItemGallery({
					fileUrl: result,
					fileKey: file.name,
				});

				uploadedCount++;
				if (uploadedCount === files.length) {
					toast.success(
						`${files.length} image${files.length > 1 ? "s" : ""} uploaded`
					);
				}
			};
			reader.readAsDataURL(file);
		});
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="w-full sm:max-w-2xl overflow-hidden p-0">
				<SheetHeader className="border-b">
					<SheetTitle>
						{isEditMode ? "Edit Item" : "Create New Item"}
					</SheetTitle>
					<SheetDescription>
						{isEditMode
							? "Update the details of your item"
							: "Add a new item to your catalog"}
					</SheetDescription>
				</SheetHeader>

				<ScrollArea className="h-[calc(100vh-140px)] pb-16">
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6 py- px-6"
					>
						<Controller
							control={form.control}
							name="name"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>
										Item Name <span className="text-red-500">*</span>
									</FieldLabel>
									<Input
										{...field}
										placeholder="Item Name"
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.error && (
										<FieldError>{fieldState.error.message}</FieldError>
									)}
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="description"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>Description</FieldLabel>
									<Textarea
										{...field}
										placeholder="Description"
										rows={4}
										value={field.value ?? ""}
										aria-invalid={fieldState.invalid}
									/>
									<div className="text-xs text-muted-foreground">
										{field.value?.length || 0}/500 characters
									</div>
									{fieldState.error && (
										<FieldError>{fieldState.error.message}</FieldError>
									)}
								</Field>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<Controller
								control={form.control}
								name="price"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>
											Price <span className="text-red-500">*</span>
										</FieldLabel>
										<Input
											{...field}
											type="number"
											placeholder="Price"
											value={field.value ?? ""}
											onChange={e =>
												field.onChange(
													e.target.value
														? parseFloat(e.target.value)
														: undefined
												)
											}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								control={form.control}
								name="cost"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Cost</FieldLabel>
										<Input
											{...field}
											type="number"
											placeholder="Cost"
											value={field.value ?? ""}
											onChange={e =>
												field.onChange(
													e.target.value
														? parseFloat(e.target.value)
														: undefined
												)
											}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>
						</div>

						<div className="grid grid-cols-3 gap-4">
							<Controller
								control={form.control}
								name="category"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Category</FieldLabel>
										<SelectFormField
											field={field}
											options={ITEM_CATEGORIES.map(cat => ({
												label: cat,
												value: cat,
											}))}
											placeholder="Select category"
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								control={form.control}
								name="status"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>
											Stock Status <span className="text-red-500">*</span>
										</FieldLabel>
										<SelectFormField
											field={field}
											options={Object.values(ITEM_STATUS).map(status => ({
												label: status.split("_").join(" "),
												value: status,
											}))}
											placeholder="Select status"
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="type"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>
											Type <span className="text-red-500">*</span>
										</FieldLabel>
										<SelectFormField
											field={field}
											options={Object.values(ITEM_TYPE).map(type => ({
												label: type.split("_").join(" "),
												value: type,
											}))}
											placeholder="Select type"
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<Controller
								control={form.control}
								name="thumbnail"
								render={({ fieldState }) => (
									<Field>
										<FieldLabel>
											Featured Image <span className="text-red-500">*</span>
										</FieldLabel>
										{!thumbnailUpload.preview &&
										!thumbnailUpload.isUploading &&
										!item?.thumbnail?.url ? (
											<label
												htmlFor="featured-image"
												className={cn(
													"flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:bg-muted/50 hover:border-primary/50",
													fieldState.invalid
														? "border-destructive"
														: "border-input"
												)}
											>
												<Upload className="w-8 h-8 mb-2 text-muted-foreground" />
												<p className="text-sm text-muted-foreground">
													Click to upload
												</p>
												<p className="text-xs text-muted-foreground">
													PNG, JPG, WEBP (MAX. 5MB)
												</p>
												<input
													id="featured-image"
													type="file"
													className="hidden"
													accept="image/*"
													onChange={handleThumbnailUpload}
												/>
											</label>
										) : thumbnailUpload.isUploading || isDeletingThumbnail ? (
											<div className="relative w-full h-40 rounded-lg overflow-hidden border flex items-center justify-center gap-2">
												<Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
												<p className="text-sm text-muted-foreground">
													{isDeletingThumbnail ? "Deleting..." : "Uploading..."}
												</p>
											</div>
										) : thumbnailUpload.preview ||
										  form.getValues("thumbnail") ? (
											<div className="relative w-full h-40 rounded-lg overflow-hidden border">
												<Image
													src={
														thumbnailUpload.preview ||
														form.getValues("thumbnail")?.url ||
														""
													}
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
													onClick={handleDeleteThumbnail}
												>
													<X className="h-4 w-4" />
												</Button>
											</div>
										) : (
											<div className="relative w-full h-40 rounded-lg overflow-hidden border flex items-center justify-center gap-2">
												<p className="text-sm text-muted-foreground">
													No image uploaded
												</p>
											</div>
										)}
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								control={form.control}
								name="images"
								render={({ fieldState }) => (
									<Field>
										<FieldLabel>Item Gallery</FieldLabel>
										<label
											htmlFor="gallery-images"
											className={cn(
												"flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:bg-muted/50 hover:border-primary/50",
												fieldState.invalid
													? "border-destructive"
													: "border-input"
											)}
										>
											<ImagePlus className="w-7 h-7 mb-2 text-muted-foreground" />
											<p className="text-sm text-muted-foreground">
												Add images
											</p>
											<input
												id="gallery-images"
												type="file"
												className="hidden"
												accept="image/*"
												multiple
												onChange={handleGalleryImagesUpload}
											/>
										</label>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>
						</div>
						{galleryPreviews.length > 0 && (
							<div className="grid grid-cols-3 gap-3">
								{itemGalleryFields.map((field, index) => (
									<div
										key={index}
										className="relative aspect-square rounded-lg overflow-hidden border group w-full h-full"
									>
										<img
											src={field.fileUrl}
											alt={`Gallery ${index + 1}`}
											className="w-full h-full object-cover"
										/>
										<Button
											type="button"
											variant="destructive"
											size="icon"
											className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
											onClick={() => removeItemGallery(index)}
										>
											<X className="h-3 w-3" />
										</Button>
									</div>
								))}
							</div>
						)}
						<Controller
							control={form.control}
							name="attributes"
							render={({ field }) => (
								<Field>
									<FieldLabel>Item Attributes</FieldLabel>
									<div className="space-y-3">
										<div className="grid grid-cols-[1fr,1fr,auto] gap-2">
											<div className="flex items-center gap-4">
												<div className="flex-1 space-y-2">
													<Label htmlFor="attribute-name">Name</Label>
													<Input
														id="attribute-name"
														value={attributeName}
														onChange={e => setAttributeName(e.target.value)}
														placeholder="Name (e.g., Color)"
													/>
												</div>
												<div className="flex-1 space-y-2">
													<Label htmlFor="attribute-value">Value</Label>
													<Input
														id="attribute-value"
														value={attributeValue}
														onChange={e => setAttributeValue(e.target.value)}
														placeholder="Value (e.g., Blue)"
													/>
												</div>
												<Button
													type="button"
													className="w-fit mt-auto"
													variant="default"
													onClick={() => {
														appendAttribute({
															name: attributeName,
															value: attributeValue,
														});
														setAttributeName("");
														setAttributeValue("");
													}}
													disabled={
														!attributeName.trim() || !attributeValue.trim()
													}
												>
													<PlusIcon className="w-4 h-4" />
													Add
												</Button>
											</div>
										</div>

										{field.value && field.value.length > 0 && (
											<div className="space-y-2">
												{fields.map((attr, index) => (
													<div
														key={index}
														className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
													>
														<div className="flex items-center gap-3">
															<span className="font-medium text-sm">
																{attr.name}:
															</span>
															<span className="text-sm text-muted-foreground">
																{attr.value}
															</span>
														</div>
														<Button
															type="button"
															variant="ghost"
															size="icon"
															className="h-7 w-7 hover:bg-destructive/20 hover:text-destructive"
															onClick={() => removeAttribute(index)}
														>
															<X className="h-4 w-4" />
														</Button>
													</div>
												))}
											</div>
										)}
									</div>
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="visibility"
							render={({ field }) => (
								<Field>
									<div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
										<div>
											<FieldLabel>Item Visibility</FieldLabel>
											<p className="text-sm text-muted-foreground">
												Make this item visible to customers
											</p>
										</div>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</div>
								</Field>
							)}
						/>
					</form>
				</ScrollArea>
				<div className="absolute bottom-0 flex justify-end left-0 right-0 border-t bg-background p-4">
					<MainButton
						type="submit"
						onClick={form.handleSubmit(onSubmit)}
						disabled={isSubmitting || thumbnailUpload.isUploading}
						isLoading={isSubmitting}
						loadingText={isEditMode ? "Updating..." : "Creating..."}
						className="w-fit"
					>
						{isEditMode ? "Update Item" : "Create Item"}
					</MainButton>
				</div>
			</SheetContent>
		</Sheet>
	);
};
