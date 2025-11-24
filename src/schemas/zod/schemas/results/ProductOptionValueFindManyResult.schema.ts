import * as z from 'zod';
export const ProductOptionValueFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  productOptionId: z.string(),
  valueId: z.string(),
  productOption: z.unknown(),
  optionValue: z.unknown()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});