import { z } from "zod";
import { apiFetcher, TRequestOptions, TServerResponse } from "@/lib/fetcher";
import {
	productSchemaDto,
	TCreateProductDTO,
	TUpdateProductDTO,
	TProductDTO,
} from "./product.dto";

const PRODUCTS_PATH = "/products" as const;

export const productService = {
	getProducts: async (
		options?: TRequestOptions
	): Promise<TServerResponse<TProductDTO[]>> => {
		const response = await apiFetcher.get<TProductDTO[]>(
			PRODUCTS_PATH,
			options
		);
		return {
			...response,
			data: z.array(productSchemaDto).parse(response.data),
		};
	},

	getProduct: async (
		id: string,
		options?: TRequestOptions
	): Promise<TServerResponse<TProductDTO>> => {
		const response = await apiFetcher.get<TProductDTO>(
			`${PRODUCTS_PATH}/${id}`,
			options
		);
		return { ...response, data: productSchemaDto.parse(response.data) };
	},

	createProduct: async (
		product: TCreateProductDTO,
		options?: TRequestOptions
	): Promise<TServerResponse<TProductDTO>> => {
		const response = await apiFetcher.post<TProductDTO>(
			PRODUCTS_PATH,
			product,
			options
		);
		return { ...response, data: productSchemaDto.parse(response.data) };
	},

	updateProduct: async (
		id: string,
		product: TUpdateProductDTO,
		options?: TRequestOptions
	): Promise<TServerResponse<TProductDTO>> => {
		const response = await apiFetcher.put<TProductDTO>(
			`${PRODUCTS_PATH}/${id}`,
			product,
			options
		);
		return { ...response, data: productSchemaDto.parse(response.data) };
	},

	deleteProduct: async (
		id: string,
		options?: TRequestOptions
	): Promise<TServerResponse<TProductDTO>> => {
		const response = await apiFetcher.delete<TProductDTO>(
			`${PRODUCTS_PATH}/${id}`,
			options
		);
		return { ...response, data: productSchemaDto.parse(response.data) };
	},
};
