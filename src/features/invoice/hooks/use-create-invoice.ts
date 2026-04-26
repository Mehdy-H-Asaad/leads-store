import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { invoiceService } from "@/entities/invoice/api/invoice.service";
import { INVOICE_KEYS } from "@/entities/invoice/api/invoice.keys";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TCreateInvoiceFormValues,
	invoiceFormSchema,
} from "../schema/invoice-form.schema";
import { invoiceFormMapper } from "../lib/invoice-form.mapper";
import { TInvoice } from "@/entities/invoice/model/invoice.model";

export const useCreateInvoice = ({
	onSuccess,
}: { onSuccess?: () => void } = {}) => {
	const { mutate, isPending } = useApiMutation<
		TInvoice,
		TCreateInvoiceFormValues
	>({
		mutationFn: data =>
			invoiceService.createInvoice(invoiceFormMapper.toCreateDTO(data)),
		successMsg: "Invoice created successfully",
		invalidatedKeys: [INVOICE_KEYS.LIST()],
		invalidateExact: false,
		onSuccess: () => {
			CreateInvoiceForm.reset();
			onSuccess?.();
		},
	});

	const CreateInvoiceForm = useForm<TCreateInvoiceFormValues>({
		resolver: zodResolver(invoiceFormSchema),
		defaultValues: {
			customerId: "",
			itemId: "",
			orderNumber: "",
			quantity: undefined,
			currency: "USD",
			subtotal: undefined,
			discount: 0,
			shippingCosts: 0,
			total: undefined,
		},
	});

	const onCreateInvoice = (data: TCreateInvoiceFormValues) => {
		mutate(data);
	};

	return { CreateInvoiceForm, onCreateInvoice, isCreatingInvoice: isPending };
};
