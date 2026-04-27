import { ORDER_KEYS } from "@/entities/order/api/order.keys";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { orderService } from "@/entities/order/api/order.service";
import { TOrder } from "@/entities/order/model/order.model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	storeFrontOrderSchema,
	TStoreFrontOrderFormValues,
} from "../schema/store-front-order.schema";
import { storeFrontFormMapper } from "../lib/store-front-form.mapper";

export const useSubmitStoreFrontOrder = ({
	storeUrl,
	onSuccess,
}: {
	storeUrl: string;
	onSuccess?: () => void;
}) => {
	const { mutate: submitOrder, isPending } = useApiMutation<
		TOrder,
		TStoreFrontOrderFormValues
	>({
		mutationFn: data =>
			orderService.submitStoreOrder(
				storeUrl,
				storeFrontFormMapper.toCreateDTO(data)
			),
		successMsg:
			"Inquiry submitted successfully, The store will get back to you soon.",
		invalidatedKeys: [ORDER_KEYS.LIST()],
		invalidateExact: false,
		onSuccess: () => {
			StoreFrontOrderForm.reset();
			onSuccess?.();
		},
	});

	const StoreFrontOrderForm = useForm<TStoreFrontOrderFormValues>({
		resolver: zodResolver(storeFrontOrderSchema),
		defaultValues: {
			customer: {
				name: "",
				countryCode: "",
				phone: "",
				email: undefined,
				address: undefined,
			},
			itemId: "",
			quantity: undefined,
			customerMessage: "",
		},
	});

	const onSubmitStoreFrontOrder = (data: TStoreFrontOrderFormValues) => {
		submitOrder(data);
	};

	return {
		StoreFrontOrderForm,
		onSubmitStoreFrontOrder,
		isSubmittingOrder: isPending,
	};
};
