"use client";

import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { storeService } from "@/entities/store/api/store.service";
import { STORE_KEYS } from "@/entities/store/api/store.keys";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TStoreFormValues, storeFormSchema } from "../schema/store-form.schema";
import { storeFormMapper } from "../lib/store-form.mapper";
import { TStore } from "@/entities/store/model/store.model";
import { useEffect } from "react";
import {
	TEMPLATE_ID,
	LAYOUT,
	BUTTON_VARIANT,
	BUTTON_SHAPE,
	BACKGROUND_TYPE,
	FONT,
} from "@/shared/contracts/store/store.contract";

const DEFAULT_VALUES: TStoreFormValues = {
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

export const useUpdateStore = ({
	store,
	onSuccess,
}: {
	store?: TStore;
	onSuccess?: () => void;
} = {}) => {
	const { mutate, isPending } = useApiMutation<TStore, TStoreFormValues>({
		mutationFn: data =>
			storeService.updateStore(storeFormMapper.toUpdateDTO(data)),
		successMsg: "Store saved successfully",
		invalidatedKeys: [STORE_KEYS.ME],
		invalidateExact: false,
		onSuccess: () => {
			onSuccess?.();
		},
	});

	const storeForm = useForm<TStoreFormValues>({
		resolver: zodResolver(storeFormSchema),
		defaultValues: DEFAULT_VALUES,
	});

	useEffect(() => {
		if (store) {
			storeForm.reset(storeFormMapper.fromModelToFormValues(store));
		}
	}, [store]);

	const onUpdateStore = (data: TStoreFormValues) => {
		mutate(data);
	};

	return {
		storeForm,
		onUpdateStore,
		isUpdatingStore: isPending,
	};
};
