import type { TUserDTO } from "@/entities/user/api/user.dto";

/**
 * Full FastAPI `/auth/login` inner payload — server-to-server only.
 * The access/refresh tokens must never be forwarded to the browser.
 * Route handlers consume this type, set cookies from the tokens, then
 * return only `user` (`TUserDTO`) in the response body.
 */
export type TUpstreamLoginDataDTO = {
	user: TUserDTO;
	access_token: string;
	refresh_token: string;
	sign_up_complete_token?: string;
	token_type: string;
};

/** FastAPI `/auth/refresh` response payload — server-to-server only. */
export type TUpstreamRefreshDataDTO = {
	access_token: string;
	refresh_token: string;
	token_type: string;
};

export type TUpstreamVerifyEmailResponseDTO = {
	user: TUserDTO;
	sign_up_complete_token: string;
};
