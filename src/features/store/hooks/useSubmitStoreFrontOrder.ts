import { ORDER_KEYS } from "@/entities/order/api/order.keys";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { orderService } from "@/entities/order/api/order.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	storeFrontOrderSchema,
	TStoreFrontOrderFormValues,
} from "../schema/store-front-order.schema";
import { storeFormMapper } from "../lib/store-form.mapper";

export const useSubmitStoreFrontOrder = ({
	storeUrl,
	onSuccess,
}: {
	storeUrl: string;
	onSuccess?: () => void;
}) => {
	const form = useForm<TStoreFrontOrderFormValues>({
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

	const { mutate: submitOrder, isPending } = useApiMutation<
		void,
		TStoreFrontOrderFormValues
	>({
		mutationFn: data =>
			orderService.submitStoreOrder(
				storeUrl,
				storeFormMapper.toCreateStoreFrontDTO(data)
			),
		successMsg:
			"Inquiry submitted successfully, The store will get back to you soon.",
		invalidatedKeys: [ORDER_KEYS.LIST()],
		invalidateExact: false,
		onSuccess: () => {
			form.reset();
			onSuccess?.();
		},
	});

	const onSubmitStoreFrontOrder = (data: TStoreFrontOrderFormValues) => {
		submitOrder(data);
	};

	return {
		form,
		onSubmitStoreFrontOrder,
		isSubmittingOrder: isPending,
	};
};
