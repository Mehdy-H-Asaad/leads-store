"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	BusinessProfileSchema,
	TBusinessProfileSchema,
} from "../schema/user-settings.schema";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { TUser } from "@/entities/user/model/user.model";
import { userService } from "@/entities/user/api/user.service";
import { userFormMapper } from "../lib/user-form.mapper";
import { USER_KEYS } from "@/entities/user/api/user.key";

export const useBusinessProfileForm = () => {
	const businessProfileForm = useForm<TBusinessProfileSchema>({
		resolver: zodResolver(BusinessProfileSchema),
		defaultValues: {
			businessName: "",
			whatsappNumber: "",
			businessDescription: "",
			firstName: "",
			lastName: "",
			countryCode: "",
			address: "",
			logo: "",
			links: [],
		},
	});

	const { mutate, isPending } = useApiMutation<TUser, TBusinessProfileSchema>({
		mutationFn: data =>
			userService.updateBusinessProfile(
				userFormMapper.toUpdateBusinessProfileDTO(data)
			),
		successMsg: "Business profile updated successfully",
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: true,
	});

	const onSave = (data: TBusinessProfileSchema) => {
		mutate(data);
	};

	return { businessProfileForm, onSave, isSaving: isPending };
};
