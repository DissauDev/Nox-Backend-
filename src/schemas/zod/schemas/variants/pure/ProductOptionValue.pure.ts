import * as z from 'zod';
// prettier-ignore
export const ProductOptionValueModelSchema = z.object({
    id: z.string(),
    productOptionId: z.string(),
    valueId: z.string(),
    productOption: z.unknown(),
    optionValue: z.unknown()
}).strict();

export type ProductOptionValuePureType = z.infer<typeof ProductOptionValueModelSchema>;
