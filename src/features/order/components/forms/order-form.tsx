"use client";

import { useState } from "react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { MainButton } from "@/shared/components/common/main-button";
import { AsyncSelectFormField } from "@/shared/components/common/select/async-select-form-field";
import { TOrder } from "@/entities/order/model/order.model";
import { useCreateOrder } from "../../hooks/use-create-order";
import { useUpdateOrder } from "../../hooks/use-update-order";
import { useGetCustomers } from "@/entities/customer/api/customer.query";
import { useGetItems } from "@/entities/item/api/item.query";
import {
	ORDER_STATUS,
	PAYMENT_STATUS,
	PAYMENT_METHOD,
	DELIVERY_STATUS,
} from "@/shared/contracts/order/order.contract";

type TOrderFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	order?: TOrder;
};

export const OrderForm = ({ open, onOpenChange, order }: TOrderFormProps) => {
	const isEditMode = !!order;

	const [customerSearch, setCustomerSearch] = useState("");
	const [itemSearch, setItemSearch] = useState("");

	const { customers } = useGetCustomers({
		filters: { name: customerSearch || undefined },
	});
	const { items } = useGetItems({ filters: { name: itemSearch || undefined } });

	const handleClose = () => {
		onOpenChange(false);
	};

	const { CreateOrderForm, onCreateOrder, isCreatingOrder } = useCreateOrder({
		onSuccess: handleClose,
	});
	const { UpdateOrderForm, onUpdateOrder, isUpdatingOrder } = useUpdateOrder({
		order,
		onSuccess: handleClose,
	});

	const form = isEditMode ? UpdateOrderForm : CreateOrderForm;
	const onSubmit = isEditMode ? onUpdateOrder : onCreateOrder;
	const isSubmitting = isEditMode ? isUpdatingOrder : isCreatingOrder;

	const customerOptions = (customers ?? []).map(c => ({
		value: c.id,
		label: `${c.name} – ${c.phone}`,
	}));

	const itemOptions = (items ?? []).map(i => ({
		value: i.id,
		label: `${i.name} – $${i.price}`,
	}));

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="w-full sm:max-w-2xl overflow-hidden p-0">
				<SheetHeader className="border-b px-6 py-4">
					<SheetTitle>
						{isEditMode ? "Edit Order" : "Create New Order"}
					</SheetTitle>
					<SheetDescription>
						{isEditMode
							? "Update the details of this order"
							: "Add a new order to your store"}
					</SheetDescription>
				</SheetHeader>

				<ScrollArea className="h-[calc(100vh-140px)] pb-16">
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6 py-6 px-6"
					>
						{/* Customer & Item */}
						{!isEditMode && (
							<div className="grid grid-cols-2 gap-4">
								<AsyncSelectFormField
									form={CreateOrderForm}
									name="customer_id"
									label="Customer"
									isRequired
									placeholder="Search customers..."
									options={customerOptions}
									onSearch={setCustomerSearch}
								/>
								<AsyncSelectFormField
									form={CreateOrderForm}
									name="item_id"
									label="Item"
									isRequired
									placeholder="Search items..."
									options={itemOptions}
									onSearch={setItemSearch}
								/>
							</div>
						)}

						{isEditMode && (
							<div className="grid grid-cols-2 gap-4">
								<Field>
									<FieldLabel>Customer</FieldLabel>
									<Input value={order.customer.name} disabled />
								</Field>
								<AsyncSelectFormField
									form={UpdateOrderForm}
									name="item_id"
									label="Item"
									isRequired
									placeholder="Search items..."
									options={itemOptions}
									onSearch={setItemSearch}
									defaultLabel={order.item.name}
								/>
							</div>
						)}

						{/* Pricing */}
						<div className="grid grid-cols-2 gap-4">
							<Controller
								control={form.control}
								name="item_price"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Item Price</FieldLabel>
										<Input
											type="number"
											min={0}
											step="0.01"
											{...field}
											onChange={e => field.onChange(Number(e.target.value))}
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
								name="quantity"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>
											Quantity <span className="text-red-500">*</span>
										</FieldLabel>
										<Input
											type="number"
											min={1}
											{...field}
											onChange={e => field.onChange(Number(e.target.value))}
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
								control={form.control}
								name="total"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Total</FieldLabel>
										<Input
											type="number"
											min={0}
											step="0.01"
											{...field}
											onChange={e => field.onChange(Number(e.target.value))}
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
								name="total_cost"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Total Cost</FieldLabel>
										<Input
											type="number"
											min={0}
											step="0.01"
											{...field}
											onChange={e => field.onChange(Number(e.target.value))}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>
						</div>

						{/* Status */}
						<div className="grid grid-cols-2 gap-4">
							<Controller
								control={form.control}
								name="status"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Order Status</FieldLabel>
										<Select
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger
												className="capitalize"
												aria-invalid={fieldState.invalid}
											>
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
											<SelectContent>
												{Object.values(ORDER_STATUS).map(s => (
													<SelectItem
														className="capitalize"
														key={s}
														value={s}
													>
														{s.replace(/_/g, " ")}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="delivery_status"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Delivery Status</FieldLabel>
										<Select
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger
												className="capitalize"
												aria-invalid={fieldState.invalid}
											>
												<SelectValue placeholder="Select delivery status" />
											</SelectTrigger>
											<SelectContent>
												{Object.values(DELIVERY_STATUS).map(s => (
													<SelectItem
														className="capitalize"
														key={s}
														value={s}
													>
														{s.replace(/_/g, " ")}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>
						</div>

						{/* Payment */}
						<div className="space-y-4 border rounded-lg p-4">
							<p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
								Payment
							</p>

							<div className="grid grid-cols-2 gap-4">
								<Controller
									control={form.control}
									name="payment.status"
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel>Payment Status</FieldLabel>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger
													className="capitalize"
													aria-invalid={fieldState.invalid}
												>
													<SelectValue placeholder="Select payment status" />
												</SelectTrigger>
												<SelectContent>
													{Object.values(PAYMENT_STATUS).map(s => (
														<SelectItem className="capitalize" key={s} value={s}>
															{s}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											{fieldState.error && (
												<FieldError>{fieldState.error.message}</FieldError>
											)}
										</Field>
									)}
								/>
								<Controller
									control={form.control}
									name="payment.method"
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel>Payment Method</FieldLabel>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger
													className="capitalize"
													aria-invalid={fieldState.invalid}
												>
													<SelectValue placeholder="Select method" />
												</SelectTrigger>
												<SelectContent>
													{Object.values(PAYMENT_METHOD).map(m => (
														<SelectItem className="capitalize" key={m} value={m}>
															{m.replace(/_/g, " ")}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											{fieldState.error && (
												<FieldError>{fieldState.error.message}</FieldError>
											)}
										</Field>
									)}
								/>
							</div>

							<Controller
								control={form.control}
								name="payment.amount_paid"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Amount Paid</FieldLabel>
										<Input
											type="number"
											min={0}
											step="0.01"
											{...field}
											onChange={e => field.onChange(Number(e.target.value))}
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
								name="payment.reference"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Reference</FieldLabel>
										<Input
											{...field}
											value={field.value ?? ""}
											placeholder="Transaction reference..."
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
								name="payment.notes"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Payment Notes</FieldLabel>
										<Textarea
											{...field}
											value={field.value ?? ""}
											placeholder="Any payment notes..."
											rows={2}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>
						</div>

						{/* Additional */}
						<Controller
							control={form.control}
							name="address"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>Delivery Address</FieldLabel>
									<Input
										{...field}
										value={field.value ?? ""}
										placeholder="123 Main St, City, Country"
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
							name="customer_message"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>Customer Message</FieldLabel>
									<Textarea
										{...field}
										value={field.value ?? ""}
										placeholder="Message from the customer..."
										rows={3}
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
									<FieldLabel>Internal Notes</FieldLabel>
									<Textarea
										{...field}
										value={field.value ?? ""}
										placeholder="Internal notes..."
										rows={3}
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
						{isEditMode ? "Update Order" : "Create Order"}
					</MainButton>
				</div>
			</SheetContent>
		</Sheet>
	);
};
