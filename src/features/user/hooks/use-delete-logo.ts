import { customizationService } from "@/entities/customization/api/customization.service";
import { CUSTOMIZATION_KEYS } from "@/entities/customization/api/customization.keys";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";

export const useDeleteLogo = () => {
	const { mutate, isPending } = useApiMutation<void, void>({
		mutationFn: () => customizationService.deleteLogo(),
		successMsg: "Logo deleted successfully",
		invalidatedKeys: [CUSTOMIZATION_KEYS.ME],
		invalidateExact: true,
	});

	return { deleteLogo: mutate, isDeletingLogo: isPending };
};
