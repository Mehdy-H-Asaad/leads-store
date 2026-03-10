import { apiFetcher, TApiResponse } from "@/shared/lib/fetcher";
import {
	TMeDTO,
	TOnboardingDTO,
	TRequestEmailChangeDTO,
	TUserDTO,
	TVerifyEmailChangeDTO,
} from "./user.dto";
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
			"/users/signup/complete",
			data
		);
		return { ...response, data: userMapper.fromDtoToModel(response.data) };
	},
	requestEmailChange: async (
		data: TRequestEmailChangeDTO
	): Promise<TApiResponse<TUser>> => {
		const response = await apiFetcher.post<TApiResponse<TUserDTO>>(
			"/users/request-email-change",
			data
		);
		return { ...response, data: userMapper.fromDtoToModel(response.data) };
	},
	verifyEmailChange: async (
		data: TVerifyEmailChangeDTO
	): Promise<TApiResponse<TUser>> => {
		const response = await apiFetcher.post<TApiResponse<TUserDTO>>(
			"/users/confirm-email-change",
			data
		);
		return { ...response, data: userMapper.fromDtoToModel(response.data) };
	},
};
