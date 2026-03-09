import { z } from "zod";
import {
	apiFetcher,
	TApiResponse,
	TPaginatedApiResponse,
	TRequestOptions,
} from "@/shared/lib/fetcher";
import {
	productSchemaDto,
	TCreateProductDTO,
	TUpdateProductDTO,
	TProductDTO,
} from "./product.dto";
import { TProduct } from "../model/product.model";
import { productMapper } from "./product.mapper";

const PRODUCTS_PATH = "/products" as const;

export const productService = {
	getProducts: async (
		options?: TRequestOptions
	): Promise<TPaginatedApiResponse<TProduct>> => {
		const response = await apiFetcher.get<TPaginatedApiResponse<TProductDTO[]>>(
			PRODUCTS_PATH,
			options
		);
		const dto = z.array(productSchemaDto).parse(response.data);
		return {
			...response,
			data: dto.map(productMapper.fromDtoToModel),
		};
	},

	getProduct: async (
		id: string,
		options?: TRequestOptions
	): Promise<TApiResponse<TProduct>> => {
		const response = await apiFetcher.get<TApiResponse<TProductDTO>>(
			`${PRODUCTS_PATH}/${id}`,
			options
		);
		const dto = productSchemaDto.parse(response.data);
		return { ...response, data: productMapper.fromDtoToModel(dto) };
	},

	createProduct: async (
		product: TCreateProductDTO,
		options?: TRequestOptions
	): Promise<TApiResponse<TProduct>> => {
		const response = await apiFetcher.post<TApiResponse<TProductDTO>>(
			PRODUCTS_PATH,
			product,
			options
		);
		const dto = productSchemaDto.parse(response.data);
		return { ...response, data: productMapper.fromDtoToModel(dto) };
	},

	updateProduct: async (
		id: string,
		product: TUpdateProductDTO,
		options?: TRequestOptions
	): Promise<TApiResponse<TProduct>> => {
		const response = await apiFetcher.put<TApiResponse<TProductDTO>>(
			`${PRODUCTS_PATH}/${id}`,
			product,
			options
		);
		const dto = productSchemaDto.parse(response.data);
		return { ...response, data: productMapper.fromDtoToModel(dto) };
	},

	deleteProduct: async (
		id: string,
		options?: TRequestOptions
	): Promise<void> => {
		await apiFetcher.delete<void>(`${PRODUCTS_PATH}/${id}`, options);
	},
};
