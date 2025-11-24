import * as z from 'zod';

export const CouponRedemptionScalarFieldEnumSchema = z.enum(['id', 'couponId', 'userId', 'orderId', 'redeemedAt'])

export type CouponRedemptionScalarFieldEnum = z.infer<typeof CouponRedemptionScalarFieldEnumSchema>;