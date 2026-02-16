import { useApiMutation } from "@/hooks/use-api-mutation";
import {
	CreateLeadSchema,
	LEAD_STATUS,
	TCreateLeadDTO,
	TLeadDTO,
} from "../schema/lead.schema";
import { LEAD_KEYS } from "../constants/lead.keys";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCreateLead = () => {
	const { mutate, isPending } = useApiMutation<TLeadDTO, TCreateLeadDTO>({
		endpointURL: "/leads",
		method: "post",
		showSuccessToast: true,
		successMsg: "Lead created successfully",
		invalidatedKeys: [LEAD_KEYS.ALL],
		invalidateExact: true,
		onSuccess: () => {
			CreateLeadForm.reset();
		},
	});
	const CreateLeadForm = useForm<TCreateLeadDTO>({
		resolver: zodResolver(CreateLeadSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			source: undefined,
			status: LEAD_STATUS.NEW,
			budgetFrom: undefined,
			budgetTo: undefined,
			note: "",
			priority: undefined,
			country: "",
			product: "",
		},
	});

	const onCreateLead = (data: TCreateLeadDTO) => {
		mutate(data);
	};

	return {
		CreateLeadForm,
		onCreateLead,
		isCreatingLead: isPending,
	};
};
