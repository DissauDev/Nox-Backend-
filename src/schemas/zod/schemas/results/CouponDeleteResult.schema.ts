import * as z from 'zod';
export const CouponDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  code: z.string(),
  type: z.unknown(),
  discountValue: z.number(),
  expiresAt: z.date().optional(),
  isLimited: z.boolean(),
  usageLimit: z.number().int().optional(),
  usageCount: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  redemptions: z.array(z.unknown())
}));