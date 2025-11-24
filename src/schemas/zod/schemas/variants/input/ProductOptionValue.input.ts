import * as z from 'zod';
// prettier-ignore
export const ProductOptionValueInputSchema = z.object({
    id: z.string(),
    productOptionId: z.string(),
    valueId: z.string(),
    productOption: z.unknown(),
    optionValue: z.unknown()
}).strict();

export type ProductOptionValueInputType = z.infer<typeof ProductOptionValueInputSchema>;
