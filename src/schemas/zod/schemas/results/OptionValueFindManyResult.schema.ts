import * as z from 'zod';
export const OptionValueFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  group: z.unknown(),
  groupId: z.string(),
  name: z.string(),
  extraPrice: z.number(),
  imageUrl: z.string().optional(),
  description: z.string(),
  ProductOptionValue: z.array(z.unknown()),
  isAvailable: z.boolean(),
  productRef: z.unknown().optional(),
  productRefId: z.string().optional(),
  sortOrder: z.number().int()
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