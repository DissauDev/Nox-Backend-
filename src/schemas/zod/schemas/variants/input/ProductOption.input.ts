import * as z from 'zod';
// prettier-ignore
export const ProductOptionInputSchema = z.object({
    id: z.string(),
    productId: z.string(),
    groupId: z.string(),
    product: z.unknown(),
    group: z.unknown(),
    values: z.array(z.unknown()),
    sortOrder: z.number().int()
}).strict();

export type ProductOptionInputType = z.infer<typeof ProductOptionInputSchema>;
