import {
	apiFetcher,
	TRequestOptions,
	TServerResponse,
} from "@/shared/lib/fetcher";
import { TCreateLeadDTO, TUpdateLeadDTO, TLeadDTO } from "./lead.dto";

const LEADS_PATH = "/leads" as const;

export const leadService = {
	getLeads: async (
		options?: TRequestOptions
	): Promise<TServerResponse<TLeadDTO[]>> => {
		const response = await apiFetcher.get<TLeadDTO[]>(LEADS_PATH, options);
		return response;
	},

	getLead: async (
		id: string,
		options?: TRequestOptions
	): Promise<TServerResponse<TLeadDTO>> => {
		const response = await apiFetcher.get<TLeadDTO>(
			`${LEADS_PATH}/${id}`,
			options
		);
		return response;
	},

	createLead: async (
		lead: TCreateLeadDTO,
		options?: TRequestOptions
	): Promise<TServerResponse<TLeadDTO>> => {
		const response = await apiFetcher.post<TLeadDTO>(LEADS_PATH, lead, options);
		return response;
	},

	updateLead: async (
		id: string,
		lead: TUpdateLeadDTO,
		options?: TRequestOptions
	): Promise<TServerResponse<TLeadDTO>> => {
		const response = await apiFetcher.put<TLeadDTO>(
			`${LEADS_PATH}/${id}`,
			lead,
			options
		);
		return response;
	},

	deleteLead: async (
		id: string,
		options?: TRequestOptions
	): Promise<TServerResponse<TLeadDTO>> => {
		const response = await apiFetcher.delete<TLeadDTO>(
			`${LEADS_PATH}/${id}`,
			options
		);
		return response;
	},
};
