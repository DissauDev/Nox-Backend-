import * as z from 'zod';
export const CategoryAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    status: z.number(),
    onCarousel: z.number(),
    imageUrl: z.number(),
    shortDescription: z.number(),
    longDescription: z.number(),
    createdAt: z.number(),
    products: z.number(),
    sortOrder: z.number()
  }).optional(),
  _sum: z.object({
    sortOrder: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    sortOrder: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    imageUrl: z.string().nullable(),
    shortDescription: z.string().nullable(),
    longDescription: z.string().nullable(),
    createdAt: z.date().nullable(),
    sortOrder: z.number().int().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    imageUrl: z.string().nullable(),
    shortDescription: z.string().nullable(),
    longDescription: z.string().nullable(),
    createdAt: z.date().nullable(),
    sortOrder: z.number().int().nullable()
  }).nullable().optional()});