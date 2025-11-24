import * as z from 'zod';
// prettier-ignore
export const StoreConfigModelSchema = z.object({
    id: z.number().int(),
    taxEnabled: z.boolean(),
    taxPercent: z.number(),
    taxFixed: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    taxLabel: z.string()
}).strict();

export type StoreConfigPureType = z.infer<typeof StoreConfigModelSchema>;
