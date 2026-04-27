import { z } from "zod";
import {
	apiFetcher,
	TApiResponse,
	TPaginatedApiResponse,
	TRequestOptions,
} from "@/shared/lib/fetcher";
import {
	itemSchemaDto,
	TCreateItemDTO,
	TUpdateItemDTO,
	TItemDTO,
	TStoreItemDTO,
	storeItemSchemaDto,
} from "./item.dto";
import { TItem, TStoreItem } from "../model/item.model";
import { itemMapper } from "./item.mapper";

const ITEMS_PATH = "/items" as const;

export const itemService = {
	getItems: async ({
		options,
	}: {
		options?: TRequestOptions;
	}): Promise<TPaginatedApiResponse<TItem>> => {
		const response = await apiFetcher.get<TPaginatedApiResponse<TItemDTO>>(
			ITEMS_PATH,
			options
		);
		const parsed = z.array(itemSchemaDto).safeParse(response.data);

		if (!parsed.success) {
			console.error("Zod validation failed", parsed.error);
			throw new Error("Invalid data shape from API");
		}

		return {
			...response,
			data: parsed.data.map(itemMapper.fromDtoToModel),
		};
	},

	getItem: async (
		id: string,
		options?: TRequestOptions
	): Promise<TApiResponse<TItem>> => {
		const response = await apiFetcher.get<TApiResponse<TItemDTO>>(
			`${ITEMS_PATH}/${id}`,
			options
		);
		const dto = itemSchemaDto.parse(response.data);
		return { ...response, data: itemMapper.fromDtoToModel(dto) };
	},

	createItem: async (
		item: TCreateItemDTO,
		options?: TRequestOptions
	): Promise<TApiResponse<TItem>> => {
		const response = await apiFetcher.post<TApiResponse<TItemDTO>>(
			ITEMS_PATH,
			item,
			options
		);
		const dto = itemSchemaDto.parse(response.data);
		return { ...response, data: itemMapper.fromDtoToModel(dto) };
	},

	updateItem: async (
		id: string,
		item: Partial<TUpdateItemDTO>,
		options?: TRequestOptions
	): Promise<TApiResponse<TItem>> => {
		const response = await apiFetcher.patch<TApiResponse<TItemDTO>>(
			`${ITEMS_PATH}/${id}`,
			item,
			options
		);
		const dto = itemSchemaDto.parse(response.data);
		return { ...response, data: itemMapper.fromDtoToModel(dto) };
	},

	deleteItem: async (id: string, options?: TRequestOptions): Promise<void> => {
		await apiFetcher.delete<void>(`${ITEMS_PATH}/${id}`, options);
	},

	getStoreItems: async (
		storeUrl: string,
		params?: { category_id?: string; page?: number; limit?: number }
	): Promise<TPaginatedApiResponse<TStoreItem>> => {
		const response = await apiFetcher.get<TPaginatedApiResponse<TStoreItemDTO>>(
			`/${storeUrl}/items`,
			{
				params: params as Record<
					string,
					string | number | boolean | undefined | null
				>,
			}
		);
		const parsed = z.array(storeItemSchemaDto).safeParse(response.data);

		if (!parsed.success) {
			console.error("Zod validation failed", parsed.error);
			throw new Error("Invalid data shape from API");
		}

		return {
			...response,
			data: parsed.data.map(itemMapper.fromStoreDtoToModel),
		};
	},

	getStoreItemBySlug: async (
		storeUrl: string,
		slug: string
	): Promise<TApiResponse<TStoreItem>> => {
		const response = await apiFetcher.get<TApiResponse<TStoreItemDTO>>(
			`/${storeUrl}/items/${slug}`
		);
		const dto = storeItemSchemaDto.parse(response.data);
		return { ...response, data: itemMapper.fromStoreDtoToModel(dto) };
	},
};
