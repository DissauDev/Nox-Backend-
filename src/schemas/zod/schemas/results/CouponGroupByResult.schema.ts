import * as z from 'zod';
export const CouponGroupByResultSchema = z.array(z.object({
  id: z.string(),
  code: z.string(),
  discountValue: z.number(),
  expiresAt: z.date(),
  isLimited: z.boolean(),
  usageLimit: z.number().int(),
  usageCount: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    code: z.number(),
    type: z.number(),
    discountValue: z.number(),
    expiresAt: z.number(),
    isLimited: z.number(),
    usageLimit: z.number(),
    usageCount: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    redemptions: z.number()
  }).optional(),
  _sum: z.object({
    discountValue: z.number().nullable(),
    usageLimit: z.number().nullable(),
    usageCount: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    discountValue: z.number().nullable(),
    usageLimit: z.number().nullable(),
    usageCount: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    code: z.string().nullable(),
    discountValue: z.number().nullable(),
    expiresAt: z.date().nullable(),
    usageLimit: z.number().int().nullable(),
    usageCount: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    code: z.string().nullable(),
    discountValue: z.number().nullable(),
    expiresAt: z.date().nullable(),
    usageLimit: z.number().int().nullable(),
    usageCount: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));