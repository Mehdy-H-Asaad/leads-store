import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { TOrder } from "@/entities/order/model/order.model";
import { orderService } from "@/entities/order/api/order.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TUpdateOrderFormValues,
	updateOrderFormSchema,
} from "../schema/order-form.schema";
import { useEffect } from "react";
import { ORDER_KEYS } from "@/entities/order/api/order.keys";
import { orderFormMapper } from "../lib/order-form.mapper";
import {
	DELIVERY_STATUS,
	ORDER_STATUS,
} from "@/shared/contracts/order/order.contract";

export const useUpdateOrder = ({
	order,
	onSuccess,
}: {
	order?: TOrder;
	onSuccess?: () => void;
}) => {
	const { mutate, isPending } = useApiMutation<TOrder, TUpdateOrderFormValues>({
		mutationFn: data =>
			orderService.updateOrder(order!.id, orderFormMapper.toUpdateDTO(data)),
		successMsg: "Order updated successfully",
		invalidatedKeys: order
			? [ORDER_KEYS.DETAIL(order.id), ORDER_KEYS.LIST()]
			: [ORDER_KEYS.LIST()],
		invalidateExact: false,
		onSuccess: () => {
			onSuccess?.();
		},
	});

	const UpdateOrderForm = useForm<TUpdateOrderFormValues>({
		resolver: zodResolver(updateOrderFormSchema),
		defaultValues: {
			status: ORDER_STATUS.NEW,
			deliveryStatus: DELIVERY_STATUS.PENDING,
		},
	});

	const onUpdateOrder = (values: TUpdateOrderFormValues) => {
		mutate(values);
	};

	useEffect(() => {
		if (order) {
			const { customerId: _, ...updateValues } =
				orderFormMapper.fromModelToFormValues(order);
			UpdateOrderForm.reset(updateValues);
		}
	}, [order]);

	return {
		UpdateOrderForm,
		onUpdateOrder,
		isUpdatingOrder: isPending,
	};
};
