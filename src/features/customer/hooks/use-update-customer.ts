import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { TCustomer } from "@/entities/customer/model/customer.model";
import { customerService } from "@/entities/customer/api/customer.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TUpdateCustomerFormValues,
	updateCustomerFormSchema,
} from "../schema/customer-form.schema";
import { useEffect } from "react";
import { CUSTOMER_KEYS } from "@/entities/customer/api/customer.keys";
import { customerFormMapper } from "../lib/customer-form.mapper";

export const useUpdateCustomer = ({
	customer,
	onSuccess,
}: {
	customer?: TCustomer;
	onSuccess?: () => void;
}) => {
	const { mutate, isPending } = useApiMutation<
		TCustomer,
		TUpdateCustomerFormValues
	>({
		mutationFn: data =>
			customerService.updateCustomer(
				customer!.id,
				customerFormMapper.toUpdateDTO(data)
			),
		successMsg: "Customer updated successfully",
		invalidatedKeys: customer
			? [CUSTOMER_KEYS.DETAIL(customer.id), CUSTOMER_KEYS.LIST()]
			: [CUSTOMER_KEYS.LIST()],
		onSuccess: () => {
			onSuccess?.();
		},
	});

	const UpdateCustomerForm = useForm<TUpdateCustomerFormValues>({
		resolver: zodResolver(updateCustomerFormSchema),
		defaultValues: {
			name: "",
			country_code: "",
			phone: "",
			email: "",
			address: "",
			notes: "",
		},
	});

	const onUpdateCustomer = (values: TUpdateCustomerFormValues) => {
		mutate(values);
	};

	useEffect(() => {
		if (customer) {
			UpdateCustomerForm.reset(
				customerFormMapper.fromModelToFormValues(customer)
			);
		}
	}, [customer]);

	return {
		UpdateCustomerForm,
		onUpdateCustomer,
		isUpdatingCustomer: isPending,
	};
};
