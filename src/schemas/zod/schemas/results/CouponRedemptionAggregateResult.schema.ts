import * as z from 'zod';
export const CouponRedemptionAggregateResultSchema = z.object({  _count: z.object({
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
  }).nullable().optional()});