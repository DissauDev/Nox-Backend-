import * as z from 'zod';
// prettier-ignore
export const OptionValueInputSchema = z.object({
    id: z.string(),
    group: z.unknown(),
    groupId: z.string(),
    name: z.string(),
    extraPrice: z.number(),
    imageUrl: z.string().optional().nullable(),
    description: z.string(),
    ProductOptionValue: z.array(z.unknown()),
    isAvailable: z.boolean(),
    productRef: z.unknown().optional().nullable(),
    productRefId: z.string().optional().nullable(),
    sortOrder: z.number().int()
}).strict();

export type OptionValueInputType = z.infer<typeof OptionValueInputSchema>;
