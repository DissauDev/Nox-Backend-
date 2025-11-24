import * as z from 'zod';
export const ProductOptionValueAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    productOptionId: z.number(),
    valueId: z.number(),
    productOption: z.number(),
    optionValue: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    productOptionId: z.string().nullable(),
    valueId: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    productOptionId: z.string().nullable(),
    valueId: z.string().nullable()
  }).nullable().optional()});