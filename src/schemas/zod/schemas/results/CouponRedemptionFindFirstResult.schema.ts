import * as z from 'zod';
export const CouponRedemptionFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  coupon: z.unknown(),
  couponId: z.string(),
  userId: z.string().optional(),
  orderId: z.string().optional(),
  redeemedAt: z.date()
}));