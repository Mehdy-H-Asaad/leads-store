import { apiFetcher, TApiResponse } from "@/shared/lib/fetcher";
import {
	TMeDTO,
	TOnboardingDTO,
	TRequestEmailChangeDTO,
	TUpdateBusinessProfileDTO,
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
	): Promise<TApiResponse<void>> => {
		const response = await apiFetcher.post<TApiResponse<void>>(
			"/users/request-email-change",
			data
		);
		return response;
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
	updateBusinessProfile: async (
		data: TUpdateBusinessProfileDTO
	): Promise<TApiResponse<TUser>> => {
		const response = await apiFetcher.patch<TApiResponse<TUserDTO>>(
			"/users/me",
			data
		);
		return { ...response, data: userMapper.fromDtoToModel(response.data) };
	},
	deleteAccount: async (): Promise<TApiResponse<void>> => {
		const response = await apiFetcher.delete<TApiResponse<void>>("/users/me");
		return response;
	},
};
