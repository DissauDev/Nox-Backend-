import * as z from 'zod';
export const CouponRedemptionGroupByResultSchema = z.array(z.object({
  id: z.string(),
  couponId: z.string(),
  userId: z.string(),
  orderId: z.string(),
  redeemedAt: z.date(),
  _count: z.object({
    id: z.number(),
    coupon: z.number(),
    couponId: z.number(),
    userId: z.number(),
    orderId: z.number(),
    redeemedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    couponId: z.string().nullable(),
    userId: z.string().nullable(),
    orderId: z.string().nullable(),
    redeemedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    couponId: z.string().nullable(),
    userId: z.string().nullable(),
    orderId: z.string().nullable(),
    redeemedAt: z.date().nullable()
  }).nullable().optional()
}));