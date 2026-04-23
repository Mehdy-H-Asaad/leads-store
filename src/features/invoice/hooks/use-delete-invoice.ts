import { INVOICE_KEYS } from "@/entities/invoice/api/invoice.keys";
import { invoiceService } from "@/entities/invoice/api/invoice.service";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";

export const useDeleteInvoice = () => {
	const { mutate, isPending } = useApiMutation({
		mutationFn: (id: string) => invoiceService.deleteInvoice(id),
		successMsg: "Invoice deleted successfully",
		invalidatedKeys: [INVOICE_KEYS.LIST()],
		invalidateExact: false,
	});

	const onDeleteInvoice = (id: string) => {
		mutate(id);
	};

	return { onDeleteInvoice, isDeletingInvoice: isPending };
};
