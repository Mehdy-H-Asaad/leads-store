import { ORDER_KEYS } from "@/entities/order/api/order.keys";
import { orderService } from "@/entities/order/api/order.service";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";

export const useDeleteOrder = () => {
	const { mutate, isPending } = useApiMutation({
		mutationFn: (id: string) => orderService.deleteOrder(id),
		successMsg: "Order deleted successfully",
		invalidatedKeys: [ORDER_KEYS.LIST()],
		invalidateExact: false,
	});

	const onDeleteOrder = (id: string) => {
		mutate(id);
	};

	return { onDeleteOrder, isDeletingOrder: isPending };
};
