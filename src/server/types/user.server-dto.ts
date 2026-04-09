import { TUserDTO } from "@/entities/user/api/user.dto";

export type TUpstreamCompleteOnboardingResponseDTO = {
	user: TUserDTO;
	access_token: string;
	refresh_token: string;
	token_type: string;
};
