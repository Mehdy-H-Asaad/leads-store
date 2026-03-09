import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { TCreateLeadDTO, TLeadDTO } from "@/entities/lead/api/lead.dto";
import { leadService } from "@/entities/lead/api/lead.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LEAD_KEYS } from "@/entities/lead/api/lead.keys";
import { CreateLeadSchema } from "../schema/lead.schema";
import { LEAD_STATUS } from "@/shared/contracts/lead/lead.contract";

export const useCreateLead = () => {
	const { mutate, isPending } = useApiMutation<TLeadDTO, TCreateLeadDTO>({
		mutationFn: data => leadService.createLead(data),
		successMsg: "Lead created successfully",
		invalidatedKeys: [LEAD_KEYS.LISTS()],
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
			phone: null,
			source: undefined,
			status: LEAD_STATUS.NEW,
			budgetFrom: null,
			budgetTo: null,
			note: null,
			priority: undefined,
			country: null,
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
