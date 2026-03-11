import { apiFetcher, TApiResponse } from "@/shared/lib/fetcher";

import {
	TLoginResponseDTO,
	TUserDTO,
} from "../../../entities/user/api/user.dto";
import {
	TLoginDto,
	TSignupDto,
	TVerifyOTPDto,
	TForgotPasswordDto,
	TRequestVerifyEmailDto,
	TResetPasswordDto,
} from "./auth.dto";
import { TUser } from "@/entities/user/model/user.model";
import { userMapper } from "@/entities/user/api/user.mapper";

export const authService = {
	login: async (credentials: TLoginDto): Promise<TApiResponse<TUser>> => {
		const response = await apiFetcher.post<TApiResponse<TLoginResponseDTO>>(
			"/auth/login",
			credentials
		);
		return { ...response, data: userMapper.fromDtoToModel(response.data.user) };
	},

	signup: async (data: TSignupDto): Promise<TApiResponse<TUser>> => {
		const response = await apiFetcher.post<TApiResponse<TUserDTO>>(
			"/auth/signup",
			data
		);
		return { ...response, data: userMapper.fromDtoToModel(response.data) };
	},

	logout: async (): Promise<TApiResponse<void>> => {
		return await apiFetcher.post<TApiResponse<void>>("/auth/logout");
	},

	verifyEmailOTP: async (data: TVerifyOTPDto): Promise<TApiResponse<TUser>> => {
		const response = await apiFetcher.post<TApiResponse<TUserDTO>>(
			"/auth/verify-email",
			data
		);
		return { ...response, data: userMapper.fromDtoToModel(response.data) };
	},

	forgotPassword: async (
		data: TForgotPasswordDto
	): Promise<TApiResponse<{ message: string }>> => {
		const response = await apiFetcher.post<TApiResponse<{ message: string }>>(
			"/auth/request-password-reset",
			data
		);
		return response;
	},

	requestVerifyEmail: async (
		data: TRequestVerifyEmailDto
	): Promise<TApiResponse<{ message: string }>> => {
		const response = await apiFetcher.post<TApiResponse<{ message: string }>>(
			"/auth/request-verify-email",
			data
		);
		return response;
	},

	resetPassword: async (
		data: TResetPasswordDto
	): Promise<TApiResponse<TUserDTO>> => {
		const response = await apiFetcher.post<TApiResponse<TUserDTO>>(
			"/auth/reset-password",
			data
		);
		return response;
	},
};
