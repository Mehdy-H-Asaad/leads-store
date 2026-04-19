import { z } from "zod";

export const FileSchema = z.object({
	id: z.string(),
	key: z.string(),
	url: z.string().nullable(),
});

export type TFileSchema = z.infer<typeof FileSchema>;
