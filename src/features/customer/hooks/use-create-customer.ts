import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { customerService } from "@/entities/customer/api/customer.service";
import { CUSTOMER_KEYS } from "@/entities/customer/api/customer.keys";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TCreateCustomerFormValues,
	createCustomerFormSchema,
} from "../schema/customer-form.schema";
import { customerFormMapper } from "../lib/customer-form.mapper";
import { TCustomer } from "@/entities/customer/model/customer.model";

export const useCreateCustomer = ({
	onSuccess,
}: { onSuccess?: () => void } = {}) => {
	const { mutate, isPending } = useApiMutation<
		TCustomer,
		TCreateCustomerFormValues
	>({
		mutationFn: data =>
			customerService.createCustomer(customerFormMapper.toCreateDTO(data)),
		successMsg: "Customer created successfully",
		invalidatedKeys: [CUSTOMER_KEYS.LIST()],
		onSuccess: () => {
			CreateCustomerForm.reset();
			onSuccess?.();
		},
	});

	const CreateCustomerForm = useForm<TCreateCustomerFormValues>({
		resolver: zodResolver(createCustomerFormSchema),
		defaultValues: {
			name: "",
			country_code: "",
			phone: "",
			email: "",
			address: "",
			notes: "",
		},
	});

	const onCreateCustomer = (data: TCreateCustomerFormValues) => {
		mutate(data);
	};

	return {
		CreateCustomerForm,
		onCreateCustomer,
		isCreatingCustomer: isPending,
	};
};
