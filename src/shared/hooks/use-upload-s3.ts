import { apiFetcher, TApiResponse } from "../lib/fetcher";
import { useApiMutation } from "./use-api-mutation";

export enum E_S3_PATH {
	ITEM_THUMBNAIL = "temp/items/thumbnails",
	ITEM_IMAGES = "temp/items/images",
	USER_LOGO = "temp/users/logos",
	STORE_LOGO = "temp/stores/logos",
	STORE_BACKGROUND_IMAGE = "temp/stores/background_images",
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
		TUploadToAmazonS3ResponseDTO[],
		TUseUploadS3RequestDTO[]
	>({
		mutationFn: async data => {
			const presignResponse = await apiFetcher.post<
				TApiResponse<TUseUploadS3ResponseDTO[]>
			>("/storage/upload", data);

			const presignedItems = presignResponse.data;

			await Promise.all(
				presignedItems.map((presigned, index) =>
					fetch(presigned.upload_url, {
						method: "PUT",
						headers: {
							"Content-Type":
								data[index].file.type || "application/octet-stream",
						},
						body: data[index].file,
					}).then(res => {
						if (![200, 204].includes(res.status)) {
							throw new Error(`File upload failed (${res.status})`);
						}
					})
				)
			);
			return {
				...presignResponse,
				data: presignedItems.map(({ id, key }) => ({ id, key })),
			};
		},
		successMsg: "File uploaded successfully",
	});

	return {
		uploadS3: mutateAsync,
		isUploadingS3: isPending,
		s3Data: data?.data,
	};
};
