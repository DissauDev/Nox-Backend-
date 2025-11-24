import * as z from 'zod';
// prettier-ignore
export const CouponRedemptionModelSchema = z.object({
    id: z.string(),
    coupon: z.unknown(),
    couponId: z.string(),
    userId: z.string().nullable(),
    orderId: z.string().nullable(),
    redeemedAt: z.date()
}).strict();

export type CouponRedemptionPureType = z.infer<typeof CouponRedemptionModelSchema>;
