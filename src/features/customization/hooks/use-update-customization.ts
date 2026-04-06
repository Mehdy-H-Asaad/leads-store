"use client";

import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { customizationService } from "@/entities/customization/api/customization.service";
import { CUSTOMIZATION_KEYS } from "@/entities/customization/api/customization.keys";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TCustomizationFormValues,
	customizationFormSchema,
} from "../schema/customization-form.schema";
import { customizationFormMapper } from "../lib/customization-form.mapper";
import { TCustomization } from "@/entities/customization/model/customization.model";
import { useEffect } from "react";
import {
	TEMPLATE_ID,
	LAYOUT,
	BUTTON_VARIANT,
	BUTTON_SHAPE,
	BACKGROUND_TYPE,
	FONT,
} from "@/shared/contracts/customization/customization.contract";

const DEFAULT_VALUES: TCustomizationFormValues = {
	templateId: TEMPLATE_ID.TEMPLATE_A,
	config: {
		layout: LAYOUT.LIST,
		buttonVariant: BUTTON_VARIANT.OUTLINE,
		buttonShape: BUTTON_SHAPE.ROUNDED,
		theme: {
			primary: "#22c55e",
			backgroundType: BACKGROUND_TYPE.COLOR,
			background: "#0a0a0a",
			backgroundImage: null,
			text: "#ffffff",
			font: FONT.POPPINS,
		},
		profile: {
			title: "My Page",
			bio: "",
		},
	},

	links: [],
	logo: null,
};

export const useUpdateCustomization = ({
	customization,
	onSuccess,
}: {
	customization?: TCustomization;
	onSuccess?: () => void;
} = {}) => {
	const { mutate, isPending } = useApiMutation<
		TCustomization,
		TCustomizationFormValues
	>({
		mutationFn: data =>
			customizationService.updateCustomization(
				customizationFormMapper.toUpdateDTO(data)
			),
		successMsg: "Customization saved successfully",
		invalidatedKeys: [CUSTOMIZATION_KEYS.ME],
		invalidateExact: false,
		onSuccess: () => {
			onSuccess?.();
		},
	});

	const CustomizationForm = useForm<TCustomizationFormValues>({
		resolver: zodResolver(customizationFormSchema),
		defaultValues: DEFAULT_VALUES,
	});

	useEffect(() => {
		if (customization) {
			CustomizationForm.reset(
				customizationFormMapper.fromModelToFormValues(customization)
			);
		}
	}, [customization]);

	const onUpdateCustomization = (data: TCustomizationFormValues) => {
		mutate(data);
	};

	return {
		CustomizationForm,
		onUpdateCustomization,
		isUpdatingCustomization: isPending,
	};
};
