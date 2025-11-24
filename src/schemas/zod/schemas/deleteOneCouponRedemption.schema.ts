import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponRedemptionSelectObjectSchema as CouponRedemptionSelectObjectSchema } from './objects/CouponRedemptionSelect.schema';
import { CouponRedemptionIncludeObjectSchema as CouponRedemptionIncludeObjectSchema } from './objects/CouponRedemptionInclude.schema';
import { CouponRedemptionWhereUniqueInputObjectSchema as CouponRedemptionWhereUniqueInputObjectSchema } from './objects/CouponRedemptionWhereUniqueInput.schema';

export const CouponRedemptionDeleteOneSchema: z.ZodType<Prisma.CouponRedemptionDeleteArgs> = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), include: CouponRedemptionIncludeObjectSchema.optional(), where: CouponRedemptionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CouponRedemptionDeleteArgs>;

export const CouponRedemptionDeleteOneZodSchema = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), include: CouponRedemptionIncludeObjectSchema.optional(), where: CouponRedemptionWhereUniqueInputObjectSchema }).strict();