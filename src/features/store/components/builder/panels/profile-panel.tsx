"use client";

import { Controller, Control, UseFormReturn } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { TStoreFormValues } from "../../../schema/store-form.schema";
import { LogoSection } from "../logo-section";
// import Image from "next/image";
import { useFileUpload } from "@/shared/hooks/use-file-upload";

type ProfilePanelProps = {
	control: Control<TStoreFormValues>;
	form: UseFormReturn<TStoreFormValues>;
	QRImage: string;
	logoUpload: ReturnType<typeof useFileUpload>;
};

export function ProfilePanel({
	control,
	form,
	// QRImage,
	logoUpload,
}: ProfilePanelProps) {
	return (
		<div className="flex flex-col gap-5">
			{/* {QRImage && (
				<div className="flex flex-col gap-2 items-center size-full border rounded-lg p-2">
					<Image
						src={QRImage}
						alt="QR Code"
						width={160}
						height={160}
						className="w-full h-full object-cover rounded-lg"
					/>
				</div>
			)} */}

			<Controller
				control={control}
				name="config.profile.title"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Display Name</FieldLabel>
						<Input
							{...field}
							placeholder="John Doe"
							aria-invalid={fieldState.invalid}
						/>
						{fieldState.error && (
							<FieldError>{fieldState.error.message}</FieldError>
						)}
					</Field>
				)}
			/>

			<Controller
				control={control}
				name="config.profile.bio"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Bio</FieldLabel>
						<Textarea
							{...field}
							value={field.value ?? ""}
							placeholder={"Tell visitors about yourself..."}
							className="resize-none"
							rows={3}
							aria-invalid={fieldState.invalid}
						/>
						<p className="text-xs text-muted-foreground">
							{(field.value ?? "").length}/200
						</p>
						{fieldState.error && (
							<FieldError>{fieldState.error.message}</FieldError>
						)}
					</Field>
				)}
			/>

			<LogoSection form={form} logoUpload={logoUpload} />
		</div>
	);
}
