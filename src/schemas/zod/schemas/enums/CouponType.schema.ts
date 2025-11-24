import * as z from 'zod';

export const CouponTypeSchema = z.enum(['PERCENTAGE', 'AMOUNT'])

export type CouponType = z.infer<typeof CouponTypeSchema>;