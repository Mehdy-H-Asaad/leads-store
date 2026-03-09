import { apiFetcher, TApiResponse } from "@/shared/lib/fetcher";
import { TMeDTO, TOnboardingDTO, TUserDTO } from "./user.dto";
import { TUser } from "../model/user.model";
import { userMapper } from "./user.mapper";

export const userService = {
	getMe: async (): Promise<TApiResponse<TUser | null>> => {
		const response = await apiFetcher.get<TApiResponse<TMeDTO>>("/auth/me");
		return { ...response, data: userMapper.fromDtoToModel(response.data.user) };
	},
	completeOnboarding: async (
		data: TOnboardingDTO
	): Promise<TApiResponse<TUser>> => {
		const response = await apiFetcher.post<TApiResponse<TUserDTO>>(
			"/auth/signup/complete",
			data
		);
		return { ...response, data: userMapper.fromDtoToModel(response.data) };
	},
};
