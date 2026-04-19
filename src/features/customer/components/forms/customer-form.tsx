"use client";

import { Controller } from "react-hook-form";
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
import { MainButton } from "@/shared/components/common/main-button";
import { TCustomer } from "@/entities/customer/model/customer.model";
import { useCreateCustomer } from "../../hooks/use-create-customer";
import { useUpdateCustomer } from "../../hooks/use-update-customer";
import { CountryCodeSelect } from "@/shared/components/common/select/country-code-select";

type TCustomerFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	customer?: TCustomer;
};

export const CustomerForm = ({
	open,
	onOpenChange,
	customer,
}: TCustomerFormProps) => {
	const isEditMode = !!customer;

	const handleClose = () => {
		onOpenChange(false);
	};

	const { CreateCustomerForm, onCreateCustomer, isCreatingCustomer } =
		useCreateCustomer({ onSuccess: handleClose });
	const { UpdateCustomerForm, onUpdateCustomer, isUpdatingCustomer } =
		useUpdateCustomer({ customer, onSuccess: handleClose });

	const form = isEditMode ? UpdateCustomerForm : CreateCustomerForm;
	const onSubmit = isEditMode ? onUpdateCustomer : onCreateCustomer;
	const isSubmitting = isEditMode ? isUpdatingCustomer : isCreatingCustomer;

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="w-full sm:max-w-lg overflow-hidden p-0">
				<SheetHeader className="border-b">
					<SheetTitle>
						{isEditMode ? "Edit Customer" : "Create New Customer"}
					</SheetTitle>
					<SheetDescription>
						{isEditMode
							? "Update the details of your customer"
							: "Add a new customer"}
					</SheetDescription>
				</SheetHeader>

				<ScrollArea className="h-[calc(100vh-140px)] pb-16">
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6 py-6 px-6"
					>
						<Controller
							control={form.control}
							name="name"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>
										Name <span className="text-red-500">*</span>
									</FieldLabel>
									<Input
										{...field}
										placeholder="Customer name"
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.error && (
										<FieldError>{fieldState.error.message}</FieldError>
									)}
								</Field>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<Controller
								control={form.control}
								name="country_code"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>
											Country Code <span className="text-red-500">*</span>
										</FieldLabel>
										<CountryCodeSelect
											value={field.value}
											onChange={field.onChange}
											invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								control={form.control}
								name="phone"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>
											Phone <span className="text-red-500">*</span>
										</FieldLabel>
										<Input
											{...field}
											placeholder="555-0100"
											value={field.value ?? ""}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>
						</div>

						<Controller
							control={form.control}
							name="email"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>Email</FieldLabel>
									<Input
										{...field}
										type="email"
										placeholder="customer@example.com"
										value={field.value ?? ""}
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
							name="address"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>Address</FieldLabel>
									<Input
										{...field}
										placeholder="123 Main St, City, Country"
										value={field.value ?? ""}
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
							name="notes"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>Notes</FieldLabel>
									<Textarea
										{...field}
										placeholder="Any additional notes..."
										rows={4}
										value={field.value ?? ""}
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.error && (
										<FieldError>{fieldState.error.message}</FieldError>
									)}
								</Field>
							)}
						/>
					</form>
				</ScrollArea>

				<div className="absolute bottom-0 flex justify-end left-0 right-0 border-t bg-background p-4">
					<MainButton
						type="submit"
						onClick={form.handleSubmit(onSubmit)}
						disabled={isSubmitting}
						isLoading={isSubmitting}
						loadingText={isEditMode ? "Updating..." : "Creating..."}
						className="w-fit"
					>
						{isEditMode ? "Update Customer" : "Create Customer"}
					</MainButton>
				</div>
			</SheetContent>
		</Sheet>
	);
};
