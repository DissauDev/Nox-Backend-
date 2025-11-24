import * as z from 'zod';
export const PageFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  title: z.string(),
  slug: z.string(),
  layout: z.unknown(),
  isPublished: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  author: z.string().optional()
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