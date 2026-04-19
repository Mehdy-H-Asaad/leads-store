import { z } from "zod";
import {
	apiFetcher,
	TApiResponse,
	TPaginatedApiResponse,
	TRequestOptions,
} from "@/shared/lib/fetcher";
import {
	orderSchemaDto,
	TCreateOrderDTO,
	TUpdateOrderDTO,
	TOrderDTO,
} from "./order.dto";
import { TOrder } from "../model/order.model";
import { orderMapper } from "./order.mapper";

const ORDERS_PATH = "/orders" as const;

export const orderService = {
	getOrders: async ({
		options,
	}: {
		options?: TRequestOptions;
	}): Promise<TPaginatedApiResponse<TOrder>> => {
		const response = await apiFetcher.get<TPaginatedApiResponse<TOrderDTO>>(
			ORDERS_PATH,
			options
		);
		const parsed = z.array(orderSchemaDto).safeParse(response.data);

		if (!parsed.success) {
			console.error("Zod validation failed", parsed.error);
			throw new Error("Invalid data shape from API");
		}

		return {
			...response,
			data: parsed.data.map(orderMapper.fromDtoToModel),
		};
	},

	getOrder: async (
		id: string,
		options?: TRequestOptions
	): Promise<TApiResponse<TOrder>> => {
		const response = await apiFetcher.get<TApiResponse<TOrderDTO>>(
			`${ORDERS_PATH}/${id}`,
			options
		);
		const dto = orderSchemaDto.parse(response.data);
		return { ...response, data: orderMapper.fromDtoToModel(dto) };
	},

	createOrder: async (
		order: TCreateOrderDTO,
		options?: TRequestOptions
	): Promise<TApiResponse<TOrder>> => {
		const response = await apiFetcher.post<TApiResponse<TOrderDTO>>(
			ORDERS_PATH,
			order,
			options
		);
		const dto = orderSchemaDto.parse(response.data);
		return { ...response, data: orderMapper.fromDtoToModel(dto) };
	},

	updateOrder: async (
		id: string,
		order: Partial<TUpdateOrderDTO>,
		options?: TRequestOptions
	): Promise<TApiResponse<TOrder>> => {
		const response = await apiFetcher.patch<TApiResponse<TOrderDTO>>(
			`${ORDERS_PATH}/${id}`,
			order,
			options
		);
		const dto = orderSchemaDto.parse(response.data);
		return { ...response, data: orderMapper.fromDtoToModel(dto) };
	},

	deleteOrder: async (id: string, options?: TRequestOptions): Promise<void> => {
		await apiFetcher.delete<void>(`${ORDERS_PATH}/${id}`, options);
	},
};
