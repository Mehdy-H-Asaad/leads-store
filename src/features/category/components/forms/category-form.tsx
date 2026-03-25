"use client";

import { Controller } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { MainButton } from "@/shared/components/common/main-button";
import { TCategory } from "@/entities/category/model/category.model";
import { useCreateCategory } from "../../hooks/use-create-category";
import { useUpdateCategory } from "../../hooks/use-update-category";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/shared/components/ui/dialog";

type TCategoryFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	category?: TCategory;
};

export const CategoryForm = ({
	open,
	onOpenChange,
	category,
}: TCategoryFormProps) => {
	const isEditMode = !!category;

	const handleClose = () => {
		onOpenChange(false);
	};

	const { CreateCategoryForm, onCreateCategory, isCreatingCategory } =
		useCreateCategory({ onSuccess: handleClose });
	const { UpdateCategoryForm, onUpdateCategory, isUpdatingCategory } =
		useUpdateCategory({ category, onSuccess: handleClose });

	const form = isEditMode ? UpdateCategoryForm : CreateCategoryForm;
	const onSubmit = isEditMode ? onUpdateCategory : onCreateCategory;
	const isSubmitting = isEditMode ? isUpdatingCategory : isCreatingCategory;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isEditMode ? "Edit Category" : "Create New Category"}
					</DialogTitle>
					<DialogDescription>
						{isEditMode
							? "Update the details of your category"
							: "Add a new category"}
					</DialogDescription>
				</DialogHeader>

				{/* <DialogContent className="h-[calc(100vh-140px)] pb-16"> */}
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<Controller
						control={form.control}
						name="name"
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel>
									Category Name <span className="text-red-500">*</span>
								</FieldLabel>
								<Input
									{...field}
									placeholder="e.g. Electronics"
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.error && (
									<FieldError>{fieldState.error.message}</FieldError>
								)}
							</Field>
						)}
					/>
				</form>
				{/* </DialogContent> */}

				<div className="flex justify-end">
					<MainButton
						type="submit"
						onClick={form.handleSubmit(onSubmit)}
						disabled={isSubmitting}
						isLoading={isSubmitting}
						loadingText={isEditMode ? "Updating..." : "Creating..."}
						className="w-fit"
					>
						{isEditMode ? "Update Category" : "Create Category"}
					</MainButton>
				</div>
			</DialogContent>
		</Dialog>
	);
};
