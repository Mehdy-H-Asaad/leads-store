import z from "zod";

export const AuthSchema = z.object({
	confirmPassword: z.string().min(1, "Confirm password is required"),
	email: z.email("Invalid email address").min(1, "Email is required"),
	newPassword: z
		.string()
		.min(8, "New password must be at least 8 characters long")
		.min(1, "New password is required"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.min(1, "Password is required"),
	token: z.string().min(1, "Verification token is required"),
	newEmail: z.email("Invalid email address").min(1, "Email is required"),
	code: z.string().min(1, "OTP is required").min(6, "OTP must be 6 digits"),
});

export const SignupSchema = AuthSchema.pick({
	email: true,
	password: true,
	confirmPassword: true,
}).refine(data => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
});

export const LoginSchema = AuthSchema.pick({
	email: true,
	password: true,
});

export const VerifyOTPSchema = AuthSchema.pick({
	email: true,
	code: true,
});

export const ForgotPasswordSchema = AuthSchema.pick({
	email: true,
});

export const requestVerifyEmailSchema = AuthSchema.pick({
	email: true,
});

export const resetPasswordSchema = AuthSchema.pick({
	email: true,
	newPassword: true,
	token: true,
});

export const requestEmailChangeSchema = AuthSchema.pick({
	newEmail: true,
	password: true,
});

export const verifyEmailChangeSchema = AuthSchema.pick({
	token: true,
});

export type TSignupSchema = z.infer<typeof SignupSchema>;
export type TLoginSchema = z.infer<typeof LoginSchema>;
export type TVerifyOTPSchema = z.infer<typeof VerifyOTPSchema>;
export type TForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;
export type TRequestVerifyEmailSchema = z.infer<
	typeof requestVerifyEmailSchema
>;
export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type TRequestEmailChangeSchema = z.infer<
	typeof requestEmailChangeSchema
>;
export type TVerifyEmailChangeSchema = z.infer<typeof verifyEmailChangeSchema>;
