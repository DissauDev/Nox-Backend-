import * as z from 'zod';
// prettier-ignore
export const OptionValueModelSchema = z.object({
    id: z.string(),
    group: z.unknown(),
    groupId: z.string(),
    name: z.string(),
    extraPrice: z.number(),
    imageUrl: z.string().nullable(),
    description: z.string(),
    ProductOptionValue: z.array(z.unknown()),
    isAvailable: z.boolean(),
    productRef: z.unknown().nullable(),
    productRefId: z.string().nullable(),
    sortOrder: z.number().int()
}).strict();

export type OptionValuePureType = z.infer<typeof OptionValueModelSchema>;
