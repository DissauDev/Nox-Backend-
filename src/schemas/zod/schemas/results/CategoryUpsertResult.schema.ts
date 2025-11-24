import * as z from 'zod';
export const CategoryUpsertResultSchema = z.object({
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
});