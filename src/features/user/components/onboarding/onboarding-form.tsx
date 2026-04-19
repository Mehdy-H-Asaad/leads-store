"use client";

import { MainButton } from "@/shared/components/common/main-button";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useOnboarding } from "../../hooks/use-onboarding";
import { OnboardingPersonalInfo } from "./onboarding-personal-info";
import { OnboardingBusinessInfo } from "./onboarding-business-info";

const STEPS = [
	{ step: 1, label: "Personal Info" },
	{ step: 2, label: "Business Info" },
];

export const OnboardingForm = () => {
	const {
		OnboardingForm,
		step,
		onNextStep,
		onPrevStep,
		onSubmitOnboarding,
		isOnboardingPending,
	} = useOnboarding();

	return (
		<div className="w-full max-w-2xl mx-auto">
			<div className="flex items-center gap-3 mb-10">
				{STEPS.map((s, idx) => {
					const isCompleted = step > s.step;
					const isCurrent = step === s.step;
					return (
						<div key={s.step} className="flex items-center gap-3">
							<div className="flex items-center gap-2">
								<div
									className={cn(
										"w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors",
										isCompleted
											? "bg-main-green border-[#15803d] text-white"
											: isCurrent
											? "border-[#15803d] text-[#15803d] bg-transparent"
											: "border-muted-foreground/30 text-muted-foreground/40 bg-transparent"
									)}
								>
									{isCompleted ? <Check className="w-4 h-4" /> : s.step}
								</div>
								<span
									className={cn(
										"text-sm font-medium",
										isCurrent
											? "text-foreground"
											: isCompleted
											? "text-[#15803d]"
											: "text-muted-foreground/50"
									)}
								>
									{s.label}
								</span>
							</div>
							{idx < STEPS.length - 1 && (
								<div
									className={cn(
										"h-px w-12 transition-colors",
										step > s.step ? "bg-main-green" : "bg-border"
									)}
								/>
							)}
						</div>
					);
				})}
			</div>

			<form
				onSubmit={OnboardingForm.handleSubmit(onSubmitOnboarding)}
				className="space-y-6"
			>
				{step === 1 && (
					<OnboardingPersonalInfo OnboardingForm={OnboardingForm} />
				)}

				{step === 2 && (
					<OnboardingBusinessInfo OnboardingForm={OnboardingForm} />
				)}

				<div className="flex items-center justify-between pt-4 border-t">
					{step === 2 ? (
						<Button
							type="button"
							variant="ghost"
							onClick={onPrevStep}
							className="flex items-center gap-2"
						>
							<ArrowLeft className="w-4 h-4" />
							Back
						</Button>
					) : (
						<div />
					)}

					{step === 1 ? (
						<Button
							type="button"
							onClick={onNextStep}
							className="flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white"
						>
							Next
							<ArrowRight className="w-4 h-4" />
						</Button>
					) : (
						<MainButton
							type="submit"
							isLoading={isOnboardingPending}
							disabled={isOnboardingPending}
							loadingText="Setting up..."
							className="bg-[#15803d] hover:bg-[#166534] text-white"
						>
							Complete Setup
						</MainButton>
					)}
				</div>
			</form>
		</div>
	);
};
