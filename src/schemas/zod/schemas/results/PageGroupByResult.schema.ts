import * as z from 'zod';
export const PageGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  title: z.string(),
  slug: z.string(),
  layout: z.unknown(),
  isPublished: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  author: z.string(),
  _count: z.object({
    id: z.number(),
    title: z.number(),
    slug: z.number(),
    layout: z.number(),
    isPublished: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    author: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    title: z.string().nullable(),
    slug: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    author: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    title: z.string().nullable(),
    slug: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    author: z.string().nullable()
  }).nullable().optional()
}));