"use client";

import { useFieldArray } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/shared/components/ui/sheet";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { MainButton } from "@/shared/components/common/main-button";
import { useCreateItem } from "../../hooks/use-create-item";
import { useUpdateItem } from "../../hooks/use-update-item";
import { E_S3_PATH } from "@/shared/hooks/use-upload-s3";
import { useFileUpload } from "@/shared/hooks/use-file-upload";
import { TItem } from "@/entities/item/model/item.model";
import { toast } from "sonner";
import { ItemBasicInfoFields } from "./fields/item-basic-info-fields";
import { ItemPricingFields } from "./fields/item-pricing-fields";
import { ItemClassificationFields } from "./fields/item-classification-fields";
import { ItemThumbnailUpload } from "./fields/item-thumbnail-upload";
import { ItemGalleryUpload } from "./fields/item-gallery-upload";
import { ItemGalleryGrid } from "./fields/item-gallery-grid";
import { ItemAttributesField } from "./fields/item-attributes-field";
import { ItemVisibilityField } from "./fields/item-visibility-field";

type TItemFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	item?: TItem;
};

export const ItemForm = ({ open, onOpenChange, item }: TItemFormProps) => {
	const isEditMode = !!item;

	const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

	const thumbnailUpload = useFileUpload({ maxSizeMB: 5 });
	const galleryUpload = useFileUpload({ maxSizeMB: 5 });

	const handleClose = () => {
		onOpenChange(false);
		thumbnailUpload.clearPreview();
		setGalleryPreviews([]);
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

	const {
		fields: attributeFields,
		append: appendAttribute,
		remove: removeAttribute,
	} = useFieldArray({ control: form.control, name: "attributes" });

	const {
		fields: galleryFields,
		append: appendGalleryImage,
		remove: removeGalleryImage,
	} = useFieldArray({ control: form.control, name: "images" });

	useEffect(() => {
		if (isEditMode && item) {
			if (item.thumbnail?.url) {
				thumbnailUpload.clearPreview();
			}
			if (item.images && item.images.length > 0) {
				setGalleryPreviews(item.images.map(img => img?.url ?? ""));
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
	};

	const handleGalleryUpload = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = Array.from(e.target.files || []);
		if (files.length === 0) return;

		await galleryUpload.uploadMultipleFiles({
			files,
			path: E_S3_PATH.ITEM_IMAGES,
			onSuccess: items => {
				items.forEach(({ result, preview }) => {
					appendGalleryImage({ id: result.id, key: result.key, url: null });
					setGalleryPreviews(prev => [...prev, preview]);
				});
				toast.success(
					`${files.length} image${files.length > 1 ? "s" : ""} uploaded`
				);
			},
		});
	};

	const handleRemoveGalleryImage = (index: number) => {
		removeGalleryImage(index);
		setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				className="w-full sm:max-w-2xl overflow-hidden p-0"
				style={{ pointerEvents: "auto" }}
			>
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
						<ItemBasicInfoFields control={form.control} />

						<ItemPricingFields control={form.control} />

						<ItemClassificationFields form={form} />

						<div className="grid grid-cols-2 gap-4">
							<ItemThumbnailUpload
								control={form.control}
								preview={thumbnailUpload.preview}
								isUploading={thumbnailUpload.isUploading}
								onUpload={handleThumbnailUpload}
								onDelete={handleDeleteThumbnail}
							/>
							<ItemGalleryUpload
								control={form.control}
								isUploading={galleryUpload.isUploading}
								onUpload={handleGalleryUpload}
							/>
						</div>

						<ItemGalleryGrid
							galleryPreviews={galleryPreviews}
							fields={galleryFields}
							onRemove={handleRemoveGalleryImage}
						/>

						<ItemAttributesField
							control={form.control}
							fields={attributeFields}
							onAppend={appendAttribute}
							onRemove={removeAttribute}
						/>

						<ItemVisibilityField control={form.control} />
					</form>
				</ScrollArea>

				<div className="absolute bottom-0 flex justify-end left-0 right-0 border-t bg-background p-4">
					<MainButton
						type="submit"
						onClick={form.handleSubmit(onSubmit)}
						disabled={
							isSubmitting ||
							thumbnailUpload.isUploading ||
							galleryUpload.isUploading
						}
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
