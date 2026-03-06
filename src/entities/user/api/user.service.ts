import { apiFetcher, TServerResponse } from "@/lib/fetcher";
import { TUserDTO, userSchemaDto } from "./user.dto";

export const userService = {
	getMe: async (): Promise<TServerResponse<TUserDTO>> => {
		const response = await apiFetcher.get<TUserDTO>("/auth/me");
		return { ...response, data: userSchemaDto.parse(response.data) };
	},
};
