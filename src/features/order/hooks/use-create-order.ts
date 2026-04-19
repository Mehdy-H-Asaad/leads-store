import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { orderService } from "@/entities/order/api/order.service";
import { ORDER_KEYS } from "@/entities/order/api/order.keys";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TCreateOrderFormValues,
	createOrderFormSchema,
} from "../schema/order-form.schema";
import { orderFormMapper } from "../lib/order-form.mapper";
import { TOrder } from "@/entities/order/model/order.model";
import {
	ORDER_STATUS,
	DELIVERY_STATUS,
	PAYMENT_STATUS,
	PAYMENT_METHOD,
	ORDER_SOURCE,
} from "@/shared/contracts/order/order.contract";

export const useCreateOrder = ({
	onSuccess,
}: { onSuccess?: () => void } = {}) => {
	const { mutate, isPending } = useApiMutation<TOrder, TCreateOrderFormValues>({
		mutationFn: data =>
			orderService.createOrder(orderFormMapper.toCreateDTO(data)),
		successMsg: "Order created successfully",
		invalidatedKeys: [ORDER_KEYS.LIST()],
		invalidateExact: true,
		onSuccess: () => {
			CreateOrderForm.reset();
			onSuccess?.();
		},
	});

	const CreateOrderForm = useForm<TCreateOrderFormValues>({
		resolver: zodResolver(createOrderFormSchema),
		defaultValues: {
			customerId: "",
			itemId: "",
			status: ORDER_STATUS.NEW,
			itemPrice: undefined,
			quantity: 1,
			total: undefined,
			totalCost: undefined,
			customerMessage: "",
			address: "",
			notes: "",
			deliveryStatus: DELIVERY_STATUS.PENDING,
			payment: {
				status: PAYMENT_STATUS.UNPAID,
				method: PAYMENT_METHOD.CASH,
				amountPaid: undefined,
				paidAt: undefined,
				reference: ORDER_SOURCE.INTERNAL,
				notes: "",
			},
		},
	});

	const onCreateOrder = (data: TCreateOrderFormValues) => {
		mutate(data);
	};

	return { CreateOrderForm, onCreateOrder, isCreatingOrder: isPending };
};
