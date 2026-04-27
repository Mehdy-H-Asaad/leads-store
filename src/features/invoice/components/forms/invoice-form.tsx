"use client";

import { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/shared/components/ui/sheet";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { MainButton } from "@/shared/components/common/main-button";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { AsyncSelectFormField } from "@/shared/components/common/select/async-select-form-field";
import { useCreateInvoice } from "../../hooks/use-create-invoice";
import { useGetCustomers } from "@/entities/customer/api/customer.query";
import { useGetItems } from "@/entities/item/api/item.query";
import { handleNumberInput } from "@/shared/utils/handle-number-input";
import {
	Combobox,
	ComboboxChips,
	ComboboxValue,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxChip,
	useComboboxAnchor,
} from "@/shared/components/ui/combobox";
import { Loader2 } from "lucide-react";
import React from "react";
type TInvoiceFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const InvoiceForm = ({ open, onOpenChange }: TInvoiceFormProps) => {
	const [customerSearch, setCustomerSearch] = useState("");
	const [itemSearch, setItemSearch] = useState("");
	const anchor = useComboboxAnchor();
	const { customers, isGettingCustomers } = useGetCustomers({
		filters: { name: customerSearch || undefined },
		limit: 30,
		page: 1,
	});

	const { items, isGettingItems } = useGetItems({
		filters: { name: itemSearch || undefined },
		limit: 30,
		page: 1,
	});

	const handleClose = () => onOpenChange(false);

	const { CreateInvoiceForm, onCreateInvoice, isCreatingInvoice } =
		useCreateInvoice({ onSuccess: handleClose });

	const customerOptions = (customers ?? []).map(c => ({
		value: c.id,
		label: `${c.name} – ${c.phone}`,
	}));

	const itemOptions: TItemOption[] = (items ?? []).map(i => ({
		value: i.id,
		label: `${i.name} – $${i.price}`,
	}));

	type TItemOption = {
		value: string;
		label: string;
	};
	const itemsIds = useWatch({
		control: CreateInvoiceForm.control,
		name: "itemIds",
	});

	useEffect(() => {
		if (!items || items.length === 0 || !itemsIds || itemsIds.length === 0)
			return;
		CreateInvoiceForm.setValue(
			"subtotal",
			itemsIds.reduce((acc, itemId) => {
				const item = items.find(i => i.id === itemId);
				return acc + (item?.price ?? 0);
			}, 0)
		);
	}, [itemsIds]);

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="w-full sm:max-w-2xl overflow-hidden p-0">
				<SheetHeader className="border-b px-6 py-4">
					<SheetTitle>Create New Invoice</SheetTitle>
					<SheetDescription>
						Generate a new invoice for an order
					</SheetDescription>
				</SheetHeader>

				<ScrollArea className="h-[calc(100vh-140px)] pb-16">
					<form
						onSubmit={CreateInvoiceForm.handleSubmit(onCreateInvoice)}
						className="space-y-6 py-6 px-6"
					>
						<Controller
							control={CreateInvoiceForm.control}
							name="itemIds"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>
										Items <span className="text-red-500">*</span>
									</FieldLabel>
									<Combobox
										multiple
										autoHighlight
										onValueChange={values => {
											field.onChange(values.map(value => value.value));
											setItemSearch("");
										}}
										items={itemOptions}
										itemToStringValue={(item: TItemOption) => item.label}
										isItemEqualToValue={(
											objectA: TItemOption,
											objectB: TItemOption
										) => objectA.value === objectB.value}
									>
										<ComboboxChips ref={anchor} className="w-full">
											<ComboboxValue>
												{(values: TItemOption[]) => (
													<React.Fragment>
														{values.map(value => (
															<ComboboxChip key={value.value}>
																{value.label}
															</ComboboxChip>
														))}
														<ComboboxChipsInput
															value={itemSearch}
															onChange={e => setItemSearch(e.target.value)}
															placeholder="Select item"
														/>
													</React.Fragment>
												)}
											</ComboboxValue>
										</ComboboxChips>
										<ComboboxContent
											anchor={anchor}
											className="p-0 pointer-events-auto w-[200px]"
										>
											<ComboboxEmpty>
												{isGettingItems ? (
													<Loader2 className="w-4 h-4 animate-spin mx-auto" />
												) : (
													"No items found"
												)}
											</ComboboxEmpty>
											<ComboboxList>
												{(item: TItemOption) => (
													<ComboboxItem key={item.value} value={item}>
														{item.label}
													</ComboboxItem>
												)}
											</ComboboxList>
										</ComboboxContent>
									</Combobox>
									{fieldState.error && (
										<FieldError>{fieldState.error.message}</FieldError>
									)}
								</Field>
							)}
						/>
						<div className="grid grid-cols-2 gap-4">
							<AsyncSelectFormField
								form={CreateInvoiceForm}
								name="customerId"
								label="Customer"
								isRequired
								placeholder="Search customers..."
								options={customerOptions}
								onSearch={setCustomerSearch}
								isLoading={isGettingCustomers}
							/>
							{/* <AsyncSelectFormField
								form={CreateInvoiceForm}
								name="itemId"
								label="Item"
								isRequired
								placeholder="Search items..."
								options={itemOptions}
								onSearch={setItemSearch}
								isLoading={isGettingItems}
							/> */}

							<Controller
								control={CreateInvoiceForm.control}
								name="orderNumber"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Order Number</FieldLabel>
										<Input
											placeholder="Order number"
											{...field}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								control={CreateInvoiceForm.control}
								name="quantity"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Quantity</FieldLabel>
										<Input
											type="number"
											min={1}
											placeholder="Quantity"
											{...field}
											value={field.value ?? ""}
											onChange={e =>
												field.onChange(handleNumberInput(e.target.value))
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
								control={CreateInvoiceForm.control}
								name="subtotal"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>
											Subtotal <span className="text-red-500">*</span>
										</FieldLabel>
										<Input
											type="number"
											step="0.01"
											min={0}
											placeholder="Subtotal"
											{...field}
											value={field.value}
											onChange={e =>
												field.onChange(handleNumberInput(e.target.value))
											}
											aria-invalid={fieldState.invalid}
											disabled={isGettingItems}
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>
							<Controller
								control={CreateInvoiceForm.control}
								name="discount"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Discount</FieldLabel>
										<Input
											type="number"
											min={0}
											step="0.01"
											placeholder="Discount"
											{...field}
											value={field.value ?? ""}
											onChange={e =>
												field.onChange(handleNumberInput(e.target.value))
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
								control={CreateInvoiceForm.control}
								name="shippingCosts"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Shipping Costs</FieldLabel>
										<Input
											type="number"
											min={0}
											step="0.01"
											placeholder="Shipping costs"
											{...field}
											value={field.value ?? ""}
											onChange={e =>
												field.onChange(handleNumberInput(e.target.value))
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
								control={CreateInvoiceForm.control}
								name="total"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>
											Total <span className="text-red-500">*</span>
										</FieldLabel>
										<Input
											type="number"
											min={0}
											step="0.01"
											placeholder="Total"
											{...field}
											value={field.value ?? ""}
											onChange={e =>
												field.onChange(handleNumberInput(e.target.value))
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
					</form>
				</ScrollArea>

				<div className="absolute bottom-0 flex justify-end left-0 right-0 border-t bg-background p-4">
					<MainButton
						type="submit"
						onClick={CreateInvoiceForm.handleSubmit(onCreateInvoice)}
						disabled={isCreatingInvoice}
						isLoading={isCreatingInvoice}
						loadingText="Creating..."
						className="w-fit"
					>
						Create Invoice
					</MainButton>
				</div>
			</SheetContent>
		</Sheet>
	);
};
