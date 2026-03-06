import type {
	TLoginDto,
	TRequestEmailChangeDto,
	TRequestVerifyEmailDto,
	TResetPasswordDto,
	TSignupDto,
	TVerifyEmailChangeDto,
	TVerifyOTPDto,
	TForgotPasswordDto,
} from "@/services/auth/auth.dto";
import type {
	TLoginSchema,
	TRequestEmailChangeSchema,
	TRequestVerifyEmailSchema,
	TResetPasswordSchema,
	TSignupSchema,
	TVerifyEmailChangeSchema,
	TVerifyOTPSchema,
	TForgotPasswordSchema,
} from "../schema/auth.schema";

export const authMapper = {
	toLoginDto: ({ email, password }: TLoginSchema) =>
		({ email, password } satisfies TLoginDto),

	toSignupDto: ({ email, password, confirmPassword }: TSignupSchema) =>
		({
			email,
			password,
			confirm_password: confirmPassword,
		} satisfies TSignupDto),

	toVerifyOtpDto: ({ email, code }: TVerifyOTPSchema) =>
		({ email, code } satisfies TVerifyOTPDto),

	toForgotPasswordDto: ({ email }: TForgotPasswordSchema) =>
		({ email } satisfies TForgotPasswordDto),

	toRequestVerifyEmailDto: ({ email }: TRequestVerifyEmailSchema) =>
		({ email } satisfies TRequestVerifyEmailDto),

	toResetPasswordDto: ({ email, newPassword, token }: TResetPasswordSchema) =>
		({ email, new_password: newPassword, token } satisfies TResetPasswordDto),

	toRequestEmailChangeDto: ({
		newEmail,
		password,
	}: TRequestEmailChangeSchema) =>
		({ new_email: newEmail, password } satisfies TRequestEmailChangeDto),

	toVerifyEmailChangeDto: ({ token }: TVerifyEmailChangeSchema) =>
		({ token } satisfies TVerifyEmailChangeDto),
} as const;
