import {
	apiFetcher,
	TApiResponse,
	TRequestOptions,
} from "@/shared/lib/fetcher";
import {
	customizationSchemaDto,
	TCustomizationDTO,
	TUpdateCustomizationDTO,
} from "./customization.dto";
import { TCustomization } from "../model/customization.model";
import { customizationMapper } from "./customization.mapper";

const CUSTOMIZATION_PATH = "/store" as const;

export const customizationService = {
	getMyCustomization: async (
		options?: TRequestOptions
	): Promise<TApiResponse<TCustomization>> => {
		const response = await apiFetcher.get<TApiResponse<TCustomizationDTO>>(
			`${CUSTOMIZATION_PATH}/me`,
			options
		);
		const dto = customizationSchemaDto.parse(response.data);
		return { ...response, data: customizationMapper.fromDtoToModel(dto) };
	},

	updateCustomization: async (
		data: Partial<TUpdateCustomizationDTO>,
		options?: TRequestOptions
	): Promise<TApiResponse<TCustomization>> => {
		const response = await apiFetcher.put<TApiResponse<TCustomizationDTO>>(
			`${CUSTOMIZATION_PATH}/me`,
			data,
			options
		);
		const dto = customizationSchemaDto.safeParse(response.data);
		if (!dto.success) {
			console.error("Zod validation failed", dto.error);
			throw new Error("Invalid data shape from API");
		}
		return {
			...response,
			data: customizationMapper.fromDtoToModel(dto.data),
		};
	},
	getStoreURL: async (
		storeUrl: string
	): Promise<TApiResponse<TCustomization>> => {
		const response = await apiFetcher.get<TApiResponse<unknown>>(
			`/store/${storeUrl}`
		);
		const dto = customizationSchemaDto.safeParse(response.data);

		if (!dto.success) {
			console.error("Zod validation failed", dto.error);
			throw new Error("Invalid data shape from API");
		}

		return {
			...response,
			data: customizationMapper.fromDtoToModel(dto.data),
		};
	},
};
