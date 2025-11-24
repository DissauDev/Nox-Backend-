import * as z from 'zod';
export const OptionValueAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    group: z.number(),
    groupId: z.number(),
    name: z.number(),
    extraPrice: z.number(),
    imageUrl: z.number(),
    description: z.number(),
    ProductOptionValue: z.number(),
    isAvailable: z.number(),
    productRef: z.number(),
    productRefId: z.number(),
    sortOrder: z.number()
  }).optional(),
  _sum: z.object({
    extraPrice: z.number().nullable(),
    sortOrder: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    extraPrice: z.number().nullable(),
    sortOrder: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    groupId: z.string().nullable(),
    name: z.string().nullable(),
    extraPrice: z.number().nullable(),
    imageUrl: z.string().nullable(),
    description: z.string().nullable(),
    productRefId: z.string().nullable(),
    sortOrder: z.number().int().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    groupId: z.string().nullable(),
    name: z.string().nullable(),
    extraPrice: z.number().nullable(),
    imageUrl: z.string().nullable(),
    description: z.string().nullable(),
    productRefId: z.string().nullable(),
    sortOrder: z.number().int().nullable()
  }).nullable().optional()});