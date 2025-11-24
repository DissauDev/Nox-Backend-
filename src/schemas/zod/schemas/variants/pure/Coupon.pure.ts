import * as z from 'zod';
import { CouponTypeSchema } from '../../enums/CouponType.schema';
// prettier-ignore
export const CouponModelSchema = z.object({
    id: z.string(),
    code: z.string(),
    type: CouponTypeSchema,
    discountValue: z.number(),
    expiresAt: z.date().nullable(),
    isLimited: z.boolean(),
    usageLimit: z.number().int().nullable(),
    usageCount: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    redemptions: z.array(z.unknown())
}).strict();

export type CouponPureType = z.infer<typeof CouponModelSchema>;
