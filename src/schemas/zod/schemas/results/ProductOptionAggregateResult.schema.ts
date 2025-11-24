import * as z from 'zod';
export const ProductOptionAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    productId: z.number(),
    groupId: z.number(),
    product: z.number(),
    group: z.number(),
    values: z.number(),
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
    productId: z.string().nullable(),
    groupId: z.string().nullable(),
    sortOrder: z.number().int().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    productId: z.string().nullable(),
    groupId: z.string().nullable(),
    sortOrder: z.number().int().nullable()
  }).nullable().optional()});