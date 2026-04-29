import {
	apiFetcher,
	TApiResponse,
	TRequestOptions,
} from "@/shared/lib/fetcher";
import {
	storeSchemaDto,
	TStoreDTO,
	TUpdateStoreDTO,
} from "./store.dto";
import { TStore } from "../model/store.model";
import { storeMapper } from "./store.mapper";

const STORE_PATH = "/store" as const;

export const storeService = {
	getMyStore: async (
		options?: TRequestOptions
	): Promise<TApiResponse<TStore>> => {
		const response = await apiFetcher.get<TApiResponse<TStoreDTO>>(
			`${STORE_PATH}/me`,
			options
		);
		const dto = storeSchemaDto.parse(response.data);
		return { ...response, data: storeMapper.fromDtoToModel(dto) };
	},

	updateStore: async (
		data: Partial<TUpdateStoreDTO>,
		options?: TRequestOptions
	): Promise<TApiResponse<TStore>> => {
		const response = await apiFetcher.put<TApiResponse<TStoreDTO>>(
			`${STORE_PATH}/me`,
			data,
			options
		);
		const dto = storeSchemaDto.safeParse(response.data);
		if (!dto.success) {
			console.error("Zod validation failed", dto.error);
			throw new Error("Invalid data shape from API");
		}
		return {
			...response,
			data: storeMapper.fromDtoToModel(dto.data),
		};
	},
	getStoreURL: async (
		storeUrl: string
	): Promise<TApiResponse<TStore>> => {
		const response = await apiFetcher.get<TApiResponse<unknown>>(
			`/store/${storeUrl}`
		);
		const dto = storeSchemaDto.safeParse(response.data);

		if (!dto.success) {
			console.error("Zod validation failed", dto.error);
			throw new Error("Invalid data shape from API");
		}

		return {
			...response,
			data: storeMapper.fromDtoToModel(dto.data),
		};
	},
};
