import { Controller, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { useFileUpload } from "@/shared/hooks/use-file-upload";
import { cn } from "@/shared/lib/utils";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { E_S3_PATH } from "@/shared/hooks/use-upload-s3";
import { TCustomizationFormValues } from "../../schema/customization-form.schema";

type TLogoSectionProps = {
	form: UseFormReturn<TCustomizationFormValues>;
};

export const LogoSection = ({ form }: TLogoSectionProps) => {
	const logoUpload = useFileUpload({ maxSizeMB: 5 });

	// const { deleteLogo, isDeletingLogo } = useDeleteLogo();

	const handleDeleteLogo = () => {
		logoUpload.removeFile(form, "logo");
		// deleteLogo();
	};

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		await logoUpload.uploadFile({
			file,
			path: E_S3_PATH.STORE_LOGO,
			form,
			fieldName: "logo",
		});
	};

	const logoUrl = logoUpload.preview || form.watch("logo")?.url;

	return (
		<Controller
			control={form.control}
			name="logo"
			render={({ fieldState }) => (
				<Field>
					<FieldLabel>
						Logo <span className="text-red-500">*</span>
					</FieldLabel>

					{!logoUpload.preview && !logoUpload.isUploading && !logoUrl ? (
						<label
							htmlFor="logo-image"
							className={cn(
								"flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:bg-muted/50 hover:border-primary/50",
								fieldState.invalid ? "border-destructive" : "border-input"
							)}
						>
							<Upload className="w-8 h-8 mb-2 text-muted-foreground" />
							<p className="text-sm text-muted-foreground">Click to upload</p>
							<p className="text-xs text-muted-foreground">
								PNG, JPG, WEBP (MAX. 5MB)
							</p>
							<input
								id="logo-image"
								type="file"
								className="hidden"
								accept="image/*"
								onChange={handleUpload}
							/>
						</label>
					) : logoUpload.isUploading ? (
						<div className="relative w-full h-40 rounded-lg overflow-hidden border flex items-center justify-center gap-2">
							<Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
							<p className="text-sm text-muted-foreground">Uploading...</p>
						</div>
					) : logoUrl ? (
						<div className="relative w-full h-40 rounded-lg overflow-hidden border">
							<Image
								src={logoUrl}
								alt="Featured preview"
								className="w-full h-full object-contain"
								width={160}
								height={160}
							/>
							<Button
								type="button"
								variant="destructive"
								size="icon"
								className="absolute top-2 right-2 h-7 w-7 rounded-full"
								onClick={handleDeleteLogo}
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					) : (
						<div className="relative w-full h-40 rounded-lg overflow-hidden border flex items-center justify-center gap-2">
							<p className="text-sm text-muted-foreground">No image uploaded</p>
						</div>
					)}

					{fieldState.error && (
						<FieldError>{fieldState.error.message}</FieldError>
					)}
				</Field>
			)}
		/>
	);
};
