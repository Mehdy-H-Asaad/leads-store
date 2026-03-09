"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { TUserDTO } from "@/entities/user/api/user.dto";
import { USER_KEYS } from "@/entities/user/api/user.key";
import { userService } from "@/entities/user/api/user.service";
import { onboardingMapper } from "../lib/onboarding-mapper.lib";
import {
	OnboardingSchema,
	TOnboardingSchema,
} from "../schema/onboarding.schema";
import { TUser } from "@/entities/user/model/user.model";

const STEP_1_FIELDS: (keyof TOnboardingSchema)[] = [
	"firstName",
	"lastName",
	"countryCode",
	"whatsappNumber",
	"address",
	"logo",
];

export const useOnboarding = () => {
	const router = useRouter();
	const [step, setStep] = useState<1 | 2>(1);

	const { mutate, isPending } = useApiMutation<TUser, TOnboardingSchema>({
		mutationFn: data =>
			userService.completeOnboarding(onboardingMapper.toOnboardingDTO(data)),
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: true,
		successMsg: "Profile setup complete! Welcome aboard.",
		onSuccess: () => {
			router.push("/");
		},
	});

	const OnboardingForm = useForm<TOnboardingSchema>({
		resolver: zodResolver(OnboardingSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			countryCode: "",
			whatsappNumber: "",
			address: "",
			logo: "",
			businessName: "",
			businessDescription: "",
			storeUrl: "",
			links: [],
		},
	});

	const onNextStep = async () => {
		const isValid = await OnboardingForm.trigger(STEP_1_FIELDS);
		if (isValid) setStep(2);
	};

	const onPrevStep = () => setStep(1);

	const onSubmitOnboarding = (values: TOnboardingSchema) => {
		mutate(values);
	};

	return {
		OnboardingForm,
		step,
		onNextStep,
		onPrevStep,
		onSubmitOnboarding,
		isOnboardingPending: isPending,
	};
};
