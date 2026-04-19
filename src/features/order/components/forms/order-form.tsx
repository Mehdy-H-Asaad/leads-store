"use client";

import { useState } from "react";
import { Sheet, SheetContent } from "@/shared/components/ui/sheet";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { MainButton } from "@/shared/components/common/main-button";
import { TOrder } from "@/entities/order/model/order.model";
import { useCreateOrder } from "../../hooks/use-create-order";
import { useUpdateOrder } from "../../hooks/use-update-order";
import { useGetCustomers } from "@/entities/customer/api/customer.query";
import { useGetItems } from "@/entities/item/api/item.query";
import { TUpdateOrderFormValues } from "../../schema/order-form.schema";
import { Control } from "react-hook-form";
import { OrderFormHeader } from "./sections/order-form-header";
import { CustomerItemFields } from "./sections/customer-item-fields";
import { PricingFields } from "./sections/pricing-fields";
import { StatusFields } from "./sections/status-fields";
import { PaymentFields } from "./sections/payment-fields";
import { AdditionalFields } from "./sections/additional-fields";

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

	const sharedControl = form.control as Control<TUpdateOrderFormValues>;

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
				<OrderFormHeader isEditMode={isEditMode} />

				<ScrollArea className="h-[calc(100vh-140px)] pb-16">
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6 py-6 px-6"
					>
						<CustomerItemFields
							isEditMode={isEditMode}
							createForm={CreateOrderForm}
							updateForm={UpdateOrderForm}
							order={order}
							customerOptions={customerOptions}
							itemOptions={itemOptions}
							onCustomerSearch={setCustomerSearch}
							onItemSearch={setItemSearch}
						/>
						<PricingFields form={form} order={order} />
						<StatusFields control={sharedControl} />
						<PaymentFields control={sharedControl} />
						<AdditionalFields control={sharedControl} />
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
