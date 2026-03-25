import { z } from "zod";

export const categoryRefContractSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export type TCategoryRefContract = z.infer<typeof categoryRefContractSchema>;
