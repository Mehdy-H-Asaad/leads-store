import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { customerService } from "@/entities/customer/api/customer.service";
import { CUSTOMER_KEYS } from "@/entities/customer/api/customer.keys";

export const useDeleteCustomer = () => {
	const { mutate, isPending } = useApiMutation({
		invalidatedKeys: [CUSTOMER_KEYS.LISTS()],
		mutationFn: (id: string) => customerService.deleteCustomer(id),
		successMsg: "Customer deleted successfully",
	});

	return { deleteCustomer: mutate, isDeletingCustomer: isPending };
};
