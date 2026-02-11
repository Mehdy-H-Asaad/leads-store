"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	BusinessProfileSchema,
	TBusinessProfileDTO,
} from "../schema/settings.schema";

const defaultValues: TBusinessProfileDTO = {
	businessName: "",
	whatsappNumber: "",
	businessDescription: "",
	storeUrlSlug: "",
};

export const useBusinessProfileForm = (initial?: Partial<TBusinessProfileDTO>) => {
	const form = useForm<TBusinessProfileDTO>({
		resolver: zodResolver(BusinessProfileSchema),
		defaultValues: { ...defaultValues, ...initial },
	});

	const onSave = (data: TBusinessProfileDTO) => {
		// TODO: API call to update business profile
		console.log("Save business profile", data);
	};

	return { form, onSave };
};
