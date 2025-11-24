import * as z from 'zod';
// prettier-ignore
export const StoreConfigResultSchema = z.object({
    id: z.number().int(),
    taxEnabled: z.boolean(),
    taxPercent: z.number(),
    taxFixed: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    taxLabel: z.string()
}).strict();

export type StoreConfigResultType = z.infer<typeof StoreConfigResultSchema>;
