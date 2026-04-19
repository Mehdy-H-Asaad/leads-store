import { useState } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { E_S3_PATH, useUploadS3 } from "./use-upload-s3";

type TFileUploadConfig = {
	maxSizeMB?: number;
	acceptedTypes?: string[];
	generatePreview?: boolean;
};

type TUploadResult = {
	id: string;
	key: string;
	url: string | null;
};

const DEFAULT_CONFIG: Required<TFileUploadConfig> = {
	maxSizeMB: 5,
	acceptedTypes: ["image/"],
	generatePreview: true,
};

export const useFileUpload = (config: TFileUploadConfig = {}) => {
	const mergedConfig = { ...DEFAULT_CONFIG, ...config };
	const { uploadS3, isUploadingS3 } = useUploadS3();
	const [preview, setPreview] = useState<string | null>(null);

	const validateFile = (file: File): boolean => {
		const maxSizeBytes = mergedConfig.maxSizeMB * 1024 * 1024;

		if (file.size > maxSizeBytes) {
			toast.error("File too large", {
				description: `File size must be less than ${mergedConfig.maxSizeMB}MB`,
			});
			return false;
		}

		const isValidType = mergedConfig.acceptedTypes.some(type =>
			file.type.startsWith(type)
		);

		if (!isValidType) {
			toast.error("Invalid file type", {
				description: `Please upload a valid file (${mergedConfig.acceptedTypes.join(
					", "
				)})`,
			});
			return false;
		}

		return true;
	};

	const generatePreview = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	const uploadFile = async <TFormValues extends FieldValues>({
		file,
		path,
		form,
		fieldName,
	}: {
		file: File;
		path: E_S3_PATH;
		form: UseFormReturn<TFormValues>;
		fieldName: Path<TFormValues>;
	}): Promise<{ success: boolean; preview?: string }> => {
		if (!validateFile(file)) {
			return { success: false };
		}

		try {
			let previewUrl: string | undefined;

			if (mergedConfig.generatePreview) {
				previewUrl = await generatePreview(file);
				setPreview(previewUrl);
			}

			const result = await uploadS3([
				{
					filename: file.name,
					path,
					file,
				},
			]);

			const uploaded = result?.data?.[0];

			if (uploaded?.key) {
				const uploadResult: TUploadResult = {
					id: uploaded.id,
					key: uploaded.key,
					url: null,
				};

				form.setValue(
					fieldName,
					uploadResult as PathValue<TFormValues, Path<TFormValues>>,
					{
						shouldValidate: true,
					}
				);

				return { success: true, preview: previewUrl };
			}

			throw new Error("Upload failed: No key returned");
		} catch (error) {
			toast.error("Upload failed", {
				description: error instanceof Error ? error.message : "Unknown error",
			});
			setPreview(null);
			return { success: false };
		}
	};

	const uploadMultipleFiles = async ({
		files,
		path,
		onSuccess,
	}: {
		files: File[];
		path: E_S3_PATH;
		onSuccess?: (items: { result: TUploadResult; preview: string }[]) => void;
	}): Promise<{ success: boolean }> => {
		for (const file of files) {
			if (!validateFile(file)) return { success: false };
		}

		try {
			const previews = await Promise.all(files.map(generatePreview));

			const s3Result = await uploadS3(
				files.map(file => ({
					filename: file.name,
					path,
					file,
				}))
			);

			if (!s3Result?.data?.length) throw new Error("Upload failed");

			const items = s3Result.data.map((uploaded, index) => ({
				result: {
					id: uploaded.id,
					key: uploaded.key,
					url: null,
				} as TUploadResult,
				preview: previews[index],
			}));

			onSuccess?.(items);
			return { success: true };
		} catch (error) {
			toast.error("Upload failed", {
				description: error instanceof Error ? error.message : "Unknown error",
			});
			return { success: false };
		}
	};

	const clearPreview = () => {
		setPreview(null);
	};

	const removeFile = <TFormValues extends FieldValues>(
		form: UseFormReturn<TFormValues>,
		fieldName: Path<TFormValues>
	) => {
		form.setValue(
			fieldName,
			null as PathValue<TFormValues, Path<TFormValues>>,
			{
				shouldValidate: true,
			}
		);
		setPreview(null);
	};

	return {
		uploadFile,
		uploadMultipleFiles,
		removeFile,
		clearPreview,
		preview,
		isUploading: isUploadingS3,
	};
};
