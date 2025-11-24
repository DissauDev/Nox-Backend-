import * as z from 'zod';
export const StoreConfigGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  taxEnabled: z.boolean(),
  taxPercent: z.number(),
  taxFixed: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  taxLabel: z.string(),
  _count: z.object({
    id: z.number(),
    taxEnabled: z.number(),
    taxPercent: z.number(),
    taxFixed: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    taxLabel: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    taxPercent: z.number().nullable(),
    taxFixed: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    taxPercent: z.number().nullable(),
    taxFixed: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    taxPercent: z.number().nullable(),
    taxFixed: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    taxLabel: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    taxPercent: z.number().nullable(),
    taxFixed: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    taxLabel: z.string().nullable()
  }).nullable().optional()
}));