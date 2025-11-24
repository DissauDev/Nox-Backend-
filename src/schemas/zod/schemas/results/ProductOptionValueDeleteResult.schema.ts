import * as z from 'zod';
export const ProductOptionValueDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  productOptionId: z.string(),
  valueId: z.string(),
  productOption: z.unknown(),
  optionValue: z.unknown()
}));