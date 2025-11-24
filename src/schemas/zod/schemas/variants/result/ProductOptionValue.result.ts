import * as z from 'zod';
// prettier-ignore
export const ProductOptionValueResultSchema = z.object({
    id: z.string(),
    productOptionId: z.string(),
    valueId: z.string(),
    productOption: z.unknown(),
    optionValue: z.unknown()
}).strict();

export type ProductOptionValueResultType = z.infer<typeof ProductOptionValueResultSchema>;
