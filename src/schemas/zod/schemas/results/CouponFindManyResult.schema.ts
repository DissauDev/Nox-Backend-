import * as z from 'zod';
export const CouponFindManyResultSchema = z.object({
  data: z.array(z.object({
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