import { z } from "zod";
import {
	apiFetcher,
	TApiResponse,
	TPaginatedApiResponse,
	TRequestOptions,
} from "@/shared/lib/fetcher";
import { invoiceSchemaDto, TCreateInvoiceDTO, TInvoiceDTO } from "./invoice.dto";
import { TInvoice } from "../model/invoice.model";
import { invoiceMapper } from "./invoice.mapper";

const INVOICES_PATH = "/invoices" as const;

export const invoiceService = {
	getInvoices: async ({
		options,
	}: {
		options?: TRequestOptions;
	}): Promise<TPaginatedApiResponse<TInvoice>> => {
		const response = await apiFetcher.get<TPaginatedApiResponse<TInvoiceDTO>>(
			INVOICES_PATH,
			options
		);
		const parsed = z.array(invoiceSchemaDto).safeParse(response.data);

		if (!parsed.success) {
			console.error("Zod validation failed", parsed.error);
			throw new Error("Invalid data shape from API");
		}

		return {
			...response,
			data: parsed.data.map(invoiceMapper.fromDtoToModel),
		};
	},

	getInvoice: async (
		id: string,
		options?: TRequestOptions
	): Promise<TApiResponse<TInvoice>> => {
		const response = await apiFetcher.get<TApiResponse<TInvoiceDTO>>(
			`${INVOICES_PATH}/${id}`,
			options
		);
		const dto = invoiceSchemaDto.parse(response.data);
		return { ...response, data: invoiceMapper.fromDtoToModel(dto) };
	},

	createInvoice: async (
		invoice: TCreateInvoiceDTO,
		options?: TRequestOptions
	): Promise<TApiResponse<TInvoice>> => {
		const response = await apiFetcher.post<TApiResponse<TInvoiceDTO>>(
			INVOICES_PATH,
			invoice,
			options
		);
		const dto = invoiceSchemaDto.parse(response.data);
		return { ...response, data: invoiceMapper.fromDtoToModel(dto) };
	},

	deleteInvoice: async (
		id: string,
		options?: TRequestOptions
	): Promise<void> => {
		await apiFetcher.delete<void>(`${INVOICES_PATH}/${id}`, options);
	},
};
