import { cn } from "@/shared/lib/utils";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Upload, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Controller, UseFormReturn } from "react-hook-form";
import { TOnboardingSchema } from "../../schema/onboarding.schema";
import { useState } from "react";
import { toast } from "sonner";
import { CountryCodeSelect } from "./country-code-select";

export const OnboardingPersonalInfo = ({
	OnboardingForm,
}: {
	OnboardingForm: UseFormReturn<TOnboardingSchema>;
}) => {
	const [logoPreview, setLogoPreview] = useState<string | null>(null);
	const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > 5 * 1024 * 1024) {
			toast.error("Image too large", {
				description: "Logo must be less than 5MB",
			});
			return;
		}
		if (!file.type.startsWith("image/")) {
			toast.error("Invalid file type", {
				description: "Please upload a valid image file",
			});
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			const result = reader.result as string;
			console.log(result);
			setLogoPreview(result);
			OnboardingForm.setValue("logo", result);
		};
		reader.readAsDataURL(file);
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">Personal Information</h2>
				<p className="text-sm text-muted-foreground mt-1">
					Tell us a bit about yourself to get started.
				</p>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<Controller
					control={OnboardingForm.control}
					name="firstName"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>
								First Name <span className="text-red-500">*</span>
							</FieldLabel>
							<Input
								{...field}
								placeholder="John"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					control={OnboardingForm.control}
					name="lastName"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>
								Last Name <span className="text-red-500">*</span>
							</FieldLabel>
							<Input
								{...field}
								placeholder="Doe"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<Controller
					control={OnboardingForm.control}
					name="countryCode"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>
								Country Code <span className="text-red-500">*</span>
							</FieldLabel>
							<CountryCodeSelect
								value={field.value}
								onChange={field.onChange}
								invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					control={OnboardingForm.control}
					name="whatsappNumber"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>
								WhatsApp Number <span className="text-red-500">*</span>
							</FieldLabel>
							<Input
								{...field}
								placeholder="5551234567"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</div>

			<Controller
				control={OnboardingForm.control}
				name="address"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Address</FieldLabel>
						<Input
							{...field}
							value={field.value ?? ""}
							placeholder="123 Main St, City, Country"
							aria-invalid={fieldState.invalid}
						/>
						{fieldState.error && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Controller
				control={OnboardingForm.control}
				name="logo"
				render={({ fieldState }) => (
					<Field>
						<FieldLabel>Profile Logo</FieldLabel>
						{!logoPreview ? (
							<label
								htmlFor="logo-upload"
								className={cn(
									"flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:bg-muted/50 hover:border-primary/50",
									fieldState.invalid ? "border-destructive" : "border-input"
								)}
							>
								<Upload className="w-7 h-7 mb-2 text-muted-foreground" />
								<p className="text-sm text-muted-foreground">
									Click to upload logo
								</p>
								<p className="text-xs text-muted-foreground">
									PNG, JPG, WEBP (MAX. 5MB)
								</p>
								<input
									id="logo-upload"
									type="file"
									className="hidden"
									accept="image/*"
									onChange={handleLogoUpload}
								/>
							</label>
						) : (
							<div className="relative w-full h-36 rounded-lg overflow-hidden border">
								<img
									src={logoPreview}
									alt="Logo preview"
									className="w-full h-full object-contain bg-muted/20"
								/>
								<Button
									type="button"
									variant="destructive"
									size="icon"
									className="absolute top-2 right-2 h-7 w-7 rounded-full"
									onClick={() => {
										setLogoPreview(null);
										OnboardingForm.setValue("logo", "");
									}}
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
						)}
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
		</div>
	);
};
