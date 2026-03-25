import { z } from "zod";
import {
	apiFetcher,
	TApiResponse,
	TPaginatedApiResponse,
	TRequestOptions,
} from "@/shared/lib/fetcher";
import {
	categorySchemaDto,
	TCreateCategoryDTO,
	TUpdateCategoryDTO,
	TCategoryDTO,
} from "./category.dto";
import { TCategory } from "../model/category.model";
import { categoryMapper } from "./category.mapper";

const CATEGORIES_PATH = "/categories" as const;

export const categoryService = {
	getCategories: async ({
		options,
	}: {
		options?: TRequestOptions;
	}): Promise<TPaginatedApiResponse<TCategory>> => {
		const response = await apiFetcher.get<TPaginatedApiResponse<TCategoryDTO>>(
			CATEGORIES_PATH,
			options
		);

		const parsed = z.array(categorySchemaDto).safeParse(response.data);

		if (!parsed.success) {
			console.error("Zod validation failed", parsed.error);
			throw new Error("Invalid data shape from API");
		}

		return {
			...response,
			data: parsed.data.map(categoryMapper.fromDtoToModel),
		};
	},

	getCategory: async (
		id: string,
		options?: TRequestOptions
	): Promise<TApiResponse<TCategory>> => {
		const response = await apiFetcher.get<TApiResponse<TCategoryDTO>>(
			`${CATEGORIES_PATH}/${id}`,
			options
		);
		const dto = categorySchemaDto.parse(response.data);
		return { ...response, data: categoryMapper.fromDtoToModel(dto) };
	},

	createCategory: async (
		category: TCreateCategoryDTO,
		options?: TRequestOptions
	): Promise<TApiResponse<TCategory>> => {
		const response = await apiFetcher.post<TApiResponse<TCategoryDTO>>(
			CATEGORIES_PATH,
			category,
			options
		);
		const dto = categorySchemaDto.parse(response.data);
		return { ...response, data: categoryMapper.fromDtoToModel(dto) };
	},

	updateCategory: async (
		id: string,
		category: TUpdateCategoryDTO,
		options?: TRequestOptions
	): Promise<TApiResponse<TCategory>> => {
		const response = await apiFetcher.patch<TApiResponse<TCategoryDTO>>(
			`${CATEGORIES_PATH}/${id}`,
			category,
			options
		);
		const dto = categorySchemaDto.parse(response.data);
		return { ...response, data: categoryMapper.fromDtoToModel(dto) };
	},

	deleteCategory: async (
		id: string,
		options?: TRequestOptions
	): Promise<void> => {
		await apiFetcher.delete<void>(`${CATEGORIES_PATH}/${id}`, options);
	},
};
