import { apiFetcher, TApiResponse } from "../lib/fetcher";
import { useApiMutation } from "./use-api-mutation";

export enum E_S3_PATH {
	ITEM_THUMBNAIL = "temp/items/thumbnails",
	ITEM_IMAGES = "temp/items/images",
	USER_LOGO = "temp/users/logos",
}

type TUseUploadS3RequestDTO = {
	filename: string;
	path: E_S3_PATH;
	file: File;
};

type TUseUploadS3ResponseDTO = {
	id: string;
	key: string;
	upload_url: string;
};

type TUploadToAmazonS3ResponseDTO = {
	id: string;
	key: string;
};

export const useUploadS3 = () => {
	const { mutateAsync, isPending, data } = useApiMutation<
		TUploadToAmazonS3ResponseDTO,
		TUseUploadS3RequestDTO
	>({
		mutationFn: async ({ file, filename, path }) => {
			const presignResponse = await apiFetcher.post<
				TApiResponse<TUseUploadS3ResponseDTO>
			>("/storage/upload", { filename, path });

			const { id, key, upload_url } = presignResponse.data;

			const resolvedContentType = file.type || "application/octet-stream";

			try {
				const uploadResponse = await fetch(upload_url, {
					method: "PUT",
					headers: {
						"Content-Type": resolvedContentType,
					},
					body: file,
				});

				if (![200, 204].includes(uploadResponse.status)) {
					throw new Error(`File upload failed (${uploadResponse.status})`);
				}
			} catch {
				throw new Error("FileUploadException");
			}

			return { ...presignResponse, data: { id, key } };
		},
		successMsg: "File uploaded successfully",
	});

	return {
		uploadS3: mutateAsync,
		isUploadingS3: isPending,
		s3Data: data?.data,
	};
};
