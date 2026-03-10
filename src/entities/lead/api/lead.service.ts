import {
	apiFetcher,
	TRequestOptions,
	TApiResponse,
	TPaginatedApiResponse,
} from "@/shared/lib/fetcher";
import {
	TCreateLeadDTO,
	TUpdateLeadDTO,
	TLeadDTO,
	leadSchemaDto,
} from "./lead.dto";
import { TLead } from "../model/lead.model";
import { leadMapper } from "./lead.mapper";
import z from "zod";

const LEADS_PATH = "/leads" as const;

export const leadService = {
	getLeads: async (
		options?: TRequestOptions
	): Promise<TPaginatedApiResponse<TLead>> => {
		const response = await apiFetcher.get<TPaginatedApiResponse<TLeadDTO>>(
			LEADS_PATH,
			options
		);

		const dto = z.array(leadSchemaDto).parse(response.data ?? []);

		return {
			...response,
			data: dto.map(leadMapper.fromDtoToModel),
		};
	},

	getLead: async (
		id: string,
		options?: TRequestOptions
	): Promise<TApiResponse<TLead>> => {
		const response = await apiFetcher.get<TApiResponse<TLeadDTO>>(
			`${LEADS_PATH}/${id}`,
			options
		);
		const dto = leadSchemaDto.parse(response.data);
		return {
			...response,
			data: leadMapper.fromDtoToModel(dto),
		};
	},

	createLead: async (
		lead: TCreateLeadDTO,
		options?: TRequestOptions
	): Promise<TApiResponse<TLead>> => {
		const response = await apiFetcher.post<TApiResponse<TLeadDTO>>(
			LEADS_PATH,
			lead,
			options
		);
		const dto = leadSchemaDto.parse(response.data);
		return {
			...response,
			data: leadMapper.fromDtoToModel(dto),
		};
	},

	updateLead: async (
		id: string,
		lead: TUpdateLeadDTO,
		options?: TRequestOptions
	): Promise<TApiResponse<TLead>> => {
		const response = await apiFetcher.put<TApiResponse<TLeadDTO>>(
			`${LEADS_PATH}/${id}`,
			lead,
			options
		);
		const dto = leadSchemaDto.parse(response.data);
		return {
			...response,
			data: leadMapper.fromDtoToModel(dto),
		};
	},

	deleteLead: async (
		id: string,
		options?: TRequestOptions
	): Promise<TApiResponse<void>> => {
		const response = await apiFetcher.delete<TApiResponse<void>>(
			`${LEADS_PATH}/${id}`,
			options
		);
		return response;
	},
};
