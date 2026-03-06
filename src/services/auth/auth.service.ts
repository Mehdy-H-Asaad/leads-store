import { apiFetcher, TServerResponse } from "@/lib/fetcher";

import { TUserDTO } from "../../entities/user/api/user.dto";
import {
	TLoginDto,
	TSignupDto,
	TVerifyOTPDto,
	TForgotPasswordDto,
	TRequestVerifyEmailDto,
	TResetPasswordDto,
	TRequestEmailChangeDto,
	TVerifyEmailChangeDto,
} from "./auth.dto";

export const authService = {
	login: async (credentials: TLoginDto): Promise<TServerResponse<TUserDTO>> => {
		const response = await apiFetcher.post<TUserDTO>(
			"/auth/login",
			credentials
		);
		return response;
	},

	signup: async (data: TSignupDto): Promise<TServerResponse<TUserDTO>> => {
		const response = await apiFetcher.post<TUserDTO>("/auth/signup", data);
		return response;
	},

	logout: async (): Promise<TServerResponse<TUserDTO>> => {
		const response = await apiFetcher.post<TUserDTO>("/auth/logout");
		return response;
	},

	verifyEmailOTP: async (
		data: TVerifyOTPDto
	): Promise<TServerResponse<TUserDTO>> => {
		const response = await apiFetcher.post<TUserDTO>(
			"/auth/verify-email",
			data
		);
		return response;
	},

	forgotPassword: async (
		data: TForgotPasswordDto
	): Promise<TServerResponse<{ message: string }>> => {
		const response = await apiFetcher.post<{ message: string }>(
			"/auth/forgot-password",
			data
		);
		return response;
	},

	requestVerifyEmail: async (
		data: TRequestVerifyEmailDto
	): Promise<TServerResponse<{ message: string }>> => {
		const response = await apiFetcher.post<{ message: string }>(
			"/auth/request-verify-email",
			data
		);
		return response;
	},

	resetPassword: async (
		data: TResetPasswordDto
	): Promise<TServerResponse<TUserDTO>> => {
		const response = await apiFetcher.post<TUserDTO>(
			"/auth/reset-password",
			data
		);
		return response;
	},

	requestEmailChange: async (
		data: TRequestEmailChangeDto
	): Promise<TServerResponse<{ message: string }>> => {
		const response = await apiFetcher.post<{ message: string }>(
			"/auth/request-email-change",
			data
		);
		return response;
	},

	verifyEmailChange: async (
		data: TVerifyEmailChangeDto
	): Promise<TServerResponse<TUserDTO>> => {
		const response = await apiFetcher.post<TUserDTO>(
			"/auth/verify-email-change",
			data
		);
		return response;
	},
};
