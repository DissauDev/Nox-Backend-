import * as z from 'zod';
export const ProductFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  salePrice: z.number().optional(),
  specifications: z.string().optional(),
  description: z.string().optional(),
  imageLeft: z.unknown().optional(),
  imageRight: z.unknown().optional(),
  type: z.unknown(),
  status: z.unknown(),
  categoryId: z.string(),
  category: z.unknown(),
  options: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date(),
  OrderItem: z.array(z.unknown()),
  sortOrder: z.number().int(),
  OptionValue: z.array(z.unknown()),
  isOptionItem: z.boolean(),
  packOptionSurcharge: z.number(),
  packMaxItems: z.number().int().optional()
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