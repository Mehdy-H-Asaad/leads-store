import { z } from "zod";
import {
	apiFetcher,
	TApiResponse,
	TPaginatedApiResponse,
	TRequestOptions,
} from "@/shared/lib/fetcher";
import {
	customerSchemaDto,
	TCreateCustomerDTO,
	TUpdateCustomerDTO,
	TCustomerDTO,
} from "./customer.dto";
import { TCustomer } from "../model/customer.model";
import { customerMapper } from "./customer.mapper";

const CUSTOMERS_PATH = "/customers" as const;

export const customerService = {
	getCustomers: async ({
		options,
	}: {
		options?: TRequestOptions;
	}): Promise<TPaginatedApiResponse<TCustomer>> => {
		const response = await apiFetcher.get<TPaginatedApiResponse<TCustomerDTO>>(
			CUSTOMERS_PATH,
			options
		);

		const parsed = z.array(customerSchemaDto).safeParse(response.data);

		if (!parsed.success) {
			console.error("Zod validation failed", parsed.error);
			throw new Error("Invalid data shape from API");
		}

		return {
			...response,
			data: parsed.data.map(customerMapper.fromDtoToModel),
		};
	},

	getCustomer: async (
		id: string,
		options?: TRequestOptions
	): Promise<TApiResponse<TCustomer>> => {
		const response = await apiFetcher.get<TApiResponse<TCustomerDTO>>(
			`${CUSTOMERS_PATH}/${id}`,
			options
		);
		const dto = customerSchemaDto.parse(response.data);
		return { ...response, data: customerMapper.fromDtoToModel(dto) };
	},

	createCustomer: async (
		customer: TCreateCustomerDTO,
		options?: TRequestOptions
	): Promise<TApiResponse<TCustomer>> => {
		const response = await apiFetcher.post<TApiResponse<TCustomerDTO>>(
			CUSTOMERS_PATH,
			customer,
			options
		);
		const dto = customerSchemaDto.parse(response.data);
		return { ...response, data: customerMapper.fromDtoToModel(dto) };
	},

	updateCustomer: async (
		id: string,
		customer: TUpdateCustomerDTO,
		options?: TRequestOptions
	): Promise<TApiResponse<TCustomer>> => {
		const response = await apiFetcher.patch<TApiResponse<TCustomerDTO>>(
			`${CUSTOMERS_PATH}/${id}`,
			customer,
			options
		);
		const dto = customerSchemaDto.parse(response.data);
		return { ...response, data: customerMapper.fromDtoToModel(dto) };
	},

	deleteCustomer: async (
		id: string,
		options?: TRequestOptions
	): Promise<void> => {
		await apiFetcher.delete<void>(`${CUSTOMERS_PATH}/${id}`, options);
	},
};
