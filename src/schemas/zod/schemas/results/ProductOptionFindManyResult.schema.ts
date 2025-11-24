import * as z from 'zod';
export const ProductOptionFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  productId: z.string(),
  groupId: z.string(),
  product: z.unknown(),
  group: z.unknown(),
  values: z.array(z.unknown()),
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