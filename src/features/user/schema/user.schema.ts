import { z } from "zod";

export enum USER_ROLE {}
// SUPER_ADMIN = "super_admin",
// HR = "hr",
// RECRUITER = "recruiter",
// INTERVIEWER = "interviewer",
// JOB_SEEKER = "job_seeker",

export enum USER_STATUS {
	ACTIVE = "active",
	SUSPENDED = "suspended",
	PENDING = "pending",
}

export const UserSchema = z.object({
	_id: z.string(),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.email("Invalid email address").min(1, "Email is required"),
	gender: z.string().optional(),
	nationality: z.string().optional(),
	phone: z.string().min(1, "Phone number is required"),
	location: z.string().optional(),
	// role: z.enum(USER_ROLE),
	verified: z.boolean(),
	status: z.enum(USER_STATUS),
	createdAt: z.date().or(z.string()),
	updatedAt: z.date().or(z.string()),
	avatar: z.string().optional(),
});

export type TUserDTO = z.infer<typeof UserSchema>;
