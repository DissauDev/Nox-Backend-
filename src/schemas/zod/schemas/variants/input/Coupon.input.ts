import * as z from 'zod';
import { CouponTypeSchema } from '../../enums/CouponType.schema';
// prettier-ignore
export const CouponInputSchema = z.object({
    id: z.string(),
    code: z.string(),
    type: CouponTypeSchema,
    discountValue: z.number(),
    expiresAt: z.date().optional().nullable(),
    isLimited: z.boolean(),
    usageLimit: z.number().int().optional().nullable(),
    usageCount: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    redemptions: z.array(z.unknown())
}).strict();

export type CouponInputType = z.infer<typeof CouponInputSchema>;
