"use client";

import { useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { MainButton } from "@/shared/components/common/main-button";
import { Button } from "@/shared/components/ui/button";
import { useCreateItem } from "../../hooks/use-create-item";
import { useUpdateItem } from "../../hooks/use-update-item";
import { E_S3_PATH } from "@/shared/hooks/use-upload-s3";
import { useFileUpload } from "@/shared/hooks/use-file-upload";
import { toast } from "sonner";
import { ItemBasicInfoFields } from "./fields/item-basic-info-fields";
import { ItemPricingFields } from "./fields/item-pricing-fields";
import { ItemClassificationFields } from "./fields/item-classification-fields";
import { ItemThumbnailUpload } from "./fields/item-thumbnail-upload";
import { ItemGalleryUpload } from "./fields/item-gallery-upload";
import { ItemGalleryGrid } from "./fields/item-gallery-grid";
import { ItemAttributesField } from "./fields/item-attributes-field";
import { ItemVisibilityField } from "./fields/item-visibility-field";
import { ArrowLeft } from "lucide-react";
import { useGetItem } from "@/entities/item/api/item.query";
import { itemFormMapper } from "../../lib/item-form.mapper";

type TItemFormProps = {
	id: string;
};

export const ItemForm = ({ id }: TItemFormProps) => {
	const router = useRouter();

	const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

	const thumbnailUpload = useFileUpload({ maxSizeMB: 5 });
	const galleryUpload = useFileUpload({ maxSizeMB: 5 });

	const handleSuccess = () => {
		router.push("/dashboard/items");
	};

	const { CreateItemForm, onCreateItem, isCreatingItem } = useCreateItem({
		onSuccess: handleSuccess,
	});
	const { UpdateItemForm, onUpdateItem, isUpdatingItem } = useUpdateItem({
		id,
		onSuccess: handleSuccess,
	});

	const { item } = useGetItem({ id });

	const isEditMode = !!item;

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
		}
	}, [isEditMode, item]);

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

	useEffect(() => {
		if (item) {
			form.reset(itemFormMapper.fromModelToUpdateFormValues(item));
		}
	}, [item, form]);

	return (
		<div className="space-y-6">
			<Button
				variant="outline"
				className="gap-2 text-muted-foreground hover:text-foreground -ml-2"
				onClick={() => router.push("/dashboard/items")}
			>
				<ArrowLeft className="h-4 w-4" />
				Back to Items
			</Button>

			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<h1 className="text-2xl font-semibold tracking-tight">
						{isEditMode ? "Edit Item" : "Create New Item"}
					</h1>
					<p className="text-sm text-muted-foreground">
						{isEditMode
							? "Update the details of your item"
							: "Add a new item to your catalog"}
					</p>
				</div>
			</div>

			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Basic Information</CardTitle>
								<CardDescription>
									Name, description, and core details of your item
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<ItemBasicInfoFields control={form.control} />
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Pricing</CardTitle>
								<CardDescription>
									Set the selling price and cost for this item
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ItemPricingFields control={form.control} />
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Classification</CardTitle>
								<CardDescription>
									Category, stock status, and item type
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ItemClassificationFields form={form} />
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Attributes</CardTitle>
								<CardDescription>
									Custom attributes like color, size, or material
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ItemAttributesField
									control={form.control}
									fields={attributeFields}
									onAppend={appendAttribute}
									onRemove={removeAttribute}
								/>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Featured Image</CardTitle>
								<CardDescription>Main thumbnail for this item</CardDescription>
							</CardHeader>
							<CardContent>
								<ItemThumbnailUpload
									control={form.control}
									preview={thumbnailUpload.preview}
									isUploading={thumbnailUpload.isUploading}
									onUpload={handleThumbnailUpload}
									onDelete={handleDeleteThumbnail}
								/>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Gallery</CardTitle>
								<CardDescription>
									Additional images for this item
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<ItemGalleryUpload
									control={form.control}
									isUploading={galleryUpload.isUploading}
									onUpload={handleGalleryUpload}
								/>
								<ItemGalleryGrid
									galleryPreviews={galleryPreviews}
									fields={galleryFields}
									onRemove={handleRemoveGalleryImage}
								/>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Visibility</CardTitle>
								<CardDescription>
									Control whether this item is visible to customers
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ItemVisibilityField control={form.control} />
							</CardContent>
						</Card>
					</div>
				</div>

				<Separator />

				<div className="flex justify-end gap-3">
					<Button
						type="button"
						variant="outline"
						onClick={() => router.push("/dashboard/items")}
						disabled={isSubmitting}
					>
						Cancel
					</Button>
					<MainButton
						type="submit"
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
			</form>
		</div>
	);
};
