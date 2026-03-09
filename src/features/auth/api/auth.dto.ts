import z from "zod";

export const authSchemaDto = z.object({
	confirm_password: z.string(),
	email: z.email(),
	new_password: z.string(),
	password: z.string(),
	token: z.string(),
	new_email: z.email(),
	code: z.string(),
});

export const signupDtoSchema = authSchemaDto.pick({
	email: true,
	password: true,
	confirm_password: true,
});

export const loginDtoSchema = authSchemaDto.pick({
	email: true,
	password: true,
});

export const verifyOtpDtoSchema = authSchemaDto.pick({
	email: true,
	code: true,
});

export const forgotPasswordDtoSchema = authSchemaDto.pick({
	email: true,
});

export const requestVerifyEmailDtoSchema = authSchemaDto.pick({
	email: true,
});

export const resetPasswordDtoSchema = authSchemaDto.pick({
	email: true,
	new_password: true,
	token: true,
});

export const requestEmailChangeDtoSchema = authSchemaDto.pick({
	new_email: true,
	password: true,
});

export const verifyEmailChangeDtoSchema = authSchemaDto.pick({
	token: true,
});

export type TSignupDto = z.infer<typeof signupDtoSchema>;
export type TLoginDto = z.infer<typeof loginDtoSchema>;
export type TVerifyOTPDto = z.infer<typeof verifyOtpDtoSchema>;
export type TForgotPasswordDto = z.infer<typeof forgotPasswordDtoSchema>;
export type TRequestVerifyEmailDto = z.infer<
	typeof requestVerifyEmailDtoSchema
>;
export type TResetPasswordDto = z.infer<typeof resetPasswordDtoSchema>;
export type TRequestEmailChangeDto = z.infer<
	typeof requestEmailChangeDtoSchema
>;
export type TVerifyEmailChangeDto = z.infer<typeof verifyEmailChangeDtoSchema>;
