import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponRedemptionSelectObjectSchema as CouponRedemptionSelectObjectSchema } from './objects/CouponRedemptionSelect.schema';
import { CouponRedemptionIncludeObjectSchema as CouponRedemptionIncludeObjectSchema } from './objects/CouponRedemptionInclude.schema';
import { CouponRedemptionCreateInputObjectSchema as CouponRedemptionCreateInputObjectSchema } from './objects/CouponRedemptionCreateInput.schema';
import { CouponRedemptionUncheckedCreateInputObjectSchema as CouponRedemptionUncheckedCreateInputObjectSchema } from './objects/CouponRedemptionUncheckedCreateInput.schema';

export const CouponRedemptionCreateOneSchema: z.ZodType<Prisma.CouponRedemptionCreateArgs> = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), include: CouponRedemptionIncludeObjectSchema.optional(), data: z.union([CouponRedemptionCreateInputObjectSchema, CouponRedemptionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CouponRedemptionCreateArgs>;

export const CouponRedemptionCreateOneZodSchema = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), include: CouponRedemptionIncludeObjectSchema.optional(), data: z.union([CouponRedemptionCreateInputObjectSchema, CouponRedemptionUncheckedCreateInputObjectSchema]) }).strict();