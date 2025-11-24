import * as z from 'zod';
// prettier-ignore
export const CouponRedemptionInputSchema = z.object({
    id: z.string(),
    coupon: z.unknown(),
    couponId: z.string(),
    userId: z.string().optional().nullable(),
    orderId: z.string().optional().nullable(),
    redeemedAt: z.date()
}).strict();

export type CouponRedemptionInputType = z.infer<typeof CouponRedemptionInputSchema>;
