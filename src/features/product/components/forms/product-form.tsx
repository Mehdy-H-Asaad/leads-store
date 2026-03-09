"use client";

import { Controller, useFieldArray } from "react-hook-form";
import { useState } from "react";
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
import { PRODUCT_STATUS } from "@/shared/contracts/product/product.contract";
import { PRODUCT_CATEGORIES } from "../../constants/product.constants";
import { ImagePlus, X, Upload, PlusIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";
import { Label } from "@/shared/components/ui/label";
import { useCreateProduct } from "../../hooks/use-create-product";

type TProductFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const ProductForm = ({ open, onOpenChange }: TProductFormProps) => {
	const [featuredPreview, setFeaturedPreview] = useState<string | null>(null);
	const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
	const [attributeName, setAttributeName] = useState("");
	const [attributeValue, setAttributeValue] = useState("");

	const { CreateProductForm, onCreateProduct, isCreatingProduct } =
		useCreateProduct();

	const {
		fields,
		append: appendAttribute,
		remove: removeAttribute,
	} = useFieldArray({
		control: CreateProductForm.control,
		name: "attributes",
	});

	const {
		fields: productGalleryFields,
		append: appendProductGallery,
		remove: removeProductGallery,
	} = useFieldArray({
		control: CreateProductForm.control,
		name: "productGallery",
	});

	const handleFeaturedImageUpload = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				toast.error("Image too large", {
					description: "Image size must be less than 5MB",
				});
				return;
			}

			if (!file.type.startsWith("image/")) {
				toast.error("Invalid file type", {
					description: "Please upload a valid image file",
				});
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				const result = reader.result as string;
				setFeaturedPreview(result);
				CreateProductForm.setValue("featuredImg", result);
				toast.success("Featured image uploaded");
			};
			reader.readAsDataURL(file);
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
				appendProductGallery({
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
			<SheetContent className="w-full sm:max-w-4xl overflow-hidden p-0">
				<SheetHeader className="border-b">
					<SheetTitle>Create New Product</SheetTitle>
					<SheetDescription>Add a new product to your catalog</SheetDescription>
				</SheetHeader>

				<ScrollArea className="h-[calc(100vh-140px)] pb-16">
					<form
						onSubmit={CreateProductForm.handleSubmit(onCreateProduct)}
						className="space-y-6 py- px-6"
					>
						<Controller
							control={CreateProductForm.control}
							name="name"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>
										Product Name <span className="text-red-500">*</span>
									</FieldLabel>
									<Input
										{...field}
										placeholder="Product Name"
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.error && (
										<FieldError>{fieldState.error.message}</FieldError>
									)}
								</Field>
							)}
						/>

						<Controller
							control={CreateProductForm.control}
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
								control={CreateProductForm.control}
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
								control={CreateProductForm.control}
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

						<div className="grid grid-cols-2 gap-4">
							<Controller
								control={CreateProductForm.control}
								name="category"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Category</FieldLabel>
										<SelectFormField
											field={field}
											options={PRODUCT_CATEGORIES.map(cat => ({
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
								control={CreateProductForm.control}
								name="status"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>
											Stock Status <span className="text-red-500">*</span>
										</FieldLabel>
										<SelectFormField
											field={field}
											options={Object.values(PRODUCT_STATUS).map(status => ({
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
						</div>
						<div className="grid grid-cols-2 gap-4">
							<Controller
								control={CreateProductForm.control}
								name="featuredImg"
								render={({ fieldState }) => (
									<Field>
										<FieldLabel>
											Featured Image <span className="text-red-500">*</span>
										</FieldLabel>
										{!featuredPreview ? (
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
													onChange={handleFeaturedImageUpload}
												/>
											</label>
										) : (
											<div className="relative w-full h-40 rounded-lg overflow-hidden border">
												<img
													src={featuredPreview}
													alt="Featured preview"
													className="w-full h-full object-cover"
												/>
												<Button
													type="button"
													variant="destructive"
													size="icon"
													className="absolute top-2 right-2 h-7 w-7 rounded-full"
													onClick={() =>
														CreateProductForm.setValue("featuredImg", "")
													}
												>
													<X className="h-4 w-4" />
												</Button>
											</div>
										)}
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								control={CreateProductForm.control}
								name="productGallery"
								render={({ fieldState }) => (
									<Field>
										<FieldLabel>Product Gallery</FieldLabel>
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
								{productGalleryFields.map((field, index) => (
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
											onClick={() => removeProductGallery(index)}
										>
											<X className="h-3 w-3" />
										</Button>
									</div>
								))}
							</div>
						)}
						<Controller
							control={CreateProductForm.control}
							name="attributes"
							render={({ field }) => (
								<Field>
									<FieldLabel>Product Attributes</FieldLabel>
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
													className="w-fit ml-auto"
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
							control={CreateProductForm.control}
							name="visibility"
							render={({ field }) => (
								<Field>
									<div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
										<div>
											<FieldLabel>Product Visibility</FieldLabel>
											<p className="text-sm text-muted-foreground">
												Make this product visible to customers
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
				<div className="absolute bottom-0 left-0 right-0 border-t bg-background p-4">
					<MainButton
						type="submit"
						onClick={() => console.log(CreateProductForm.getValues())}
						// onClick={form.handleSubmit(onSubmit)}
						disabled={isCreatingProduct}
						isLoading={isCreatingProduct}
						loadingText="Creating..."
						className="w-fit ml-auto block"
					>
						Create Product
					</MainButton>
				</div>
			</SheetContent>
		</Sheet>
	);
};
