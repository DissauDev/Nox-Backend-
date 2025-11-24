import * as z from 'zod';
export const ProductOptionFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  productId: z.string(),
  groupId: z.string(),
  product: z.unknown(),
  group: z.unknown(),
  values: z.array(z.unknown()),
  sortOrder: z.number().int()
}));