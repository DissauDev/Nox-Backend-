import * as z from 'zod';
export const PageDeleteResultSchema = z.nullable(z.object({
  id: z.number().int(),
  title: z.string(),
  slug: z.string(),
  layout: z.unknown(),
  isPublished: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  author: z.string().optional()
}));