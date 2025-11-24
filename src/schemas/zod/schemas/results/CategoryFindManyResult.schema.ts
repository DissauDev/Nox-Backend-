import * as z from 'zod';
export const CategoryFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  name: z.string(),
  status: z.unknown(),
  onCarousel: z.boolean(),
  imageUrl: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  createdAt: z.date(),
  products: z.array(z.unknown()),
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