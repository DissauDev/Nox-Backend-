import * as z from 'zod';

export const CouponScalarFieldEnumSchema = z.enum(['id', 'code', 'type', 'discountValue', 'expiresAt', 'isLimited', 'usageLimit', 'usageCount', 'createdAt', 'updatedAt'])

export type CouponScalarFieldEnum = z.infer<typeof CouponScalarFieldEnumSchema>;