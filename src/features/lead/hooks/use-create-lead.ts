import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { TLead } from "@/entities/lead/model/lead.model";
import { leadService } from "@/entities/lead/api/lead.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LEAD_KEYS } from "@/entities/lead/api/lead.keys";
import { CreateLeadSchema, TCreateLeadSchema } from "../schema/lead.schema";
import { LEAD_STATUS } from "@/shared/contracts/lead/lead.contract";
import { leadFormMapper } from "../lib/lead-form.mapper";

export const useCreateLead = () => {
	const { mutate, isPending } = useApiMutation<TLead, TCreateLeadSchema>({
		mutationFn: data =>
			leadService.createLead(leadFormMapper.toCreateDTO(data)),
		successMsg: "Lead created successfully",
		invalidatedKeys: [LEAD_KEYS.LISTS()],
		invalidateExact: true,
		onSuccess: () => {
			CreateLeadForm.reset();
		},
	});
	const CreateLeadForm = useForm<TCreateLeadSchema>({
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

	const onCreateLead = (data: TCreateLeadSchema) => {
		mutate(data);
	};

	return {
		CreateLeadForm,
		onCreateLead,
		isCreatingLead: isPending,
	};
};
