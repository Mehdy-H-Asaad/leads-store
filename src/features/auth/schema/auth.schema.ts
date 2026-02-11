import { USER_ROLE } from "@/features/user/schema/user.schema";
import z from "zod";

export const AuthSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .min(1, "Password is required"),
  role: z.enum(USER_ROLE),
  otp: z.string().min(1, "OTP is required").min(6, "OTP must be 6 digits"),
});

export const SignupSchema = AuthSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
  role: true,
});

export const LoginSchema = AuthSchema.pick({
  email: true,
  password: true,
});

export const VerifyOTPSchema = AuthSchema.pick({
  email: true,
  otp: true,
});

export const ForgotPasswordSchema = AuthSchema.pick({
  email: true,
});

export type TSignupDTO = z.infer<typeof SignupSchema>;
export type TLoginDTO = z.infer<typeof LoginSchema>;
export type TVerifyOTPDTO = z.infer<typeof VerifyOTPSchema>;
export type TForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;
