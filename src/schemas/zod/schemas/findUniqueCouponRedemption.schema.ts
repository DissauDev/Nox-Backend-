import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponRedemptionSelectObjectSchema as CouponRedemptionSelectObjectSchema } from './objects/CouponRedemptionSelect.schema';
import { CouponRedemptionIncludeObjectSchema as CouponRedemptionIncludeObjectSchema } from './objects/CouponRedemptionInclude.schema';
import { CouponRedemptionWhereUniqueInputObjectSchema as CouponRedemptionWhereUniqueInputObjectSchema } from './objects/CouponRedemptionWhereUniqueInput.schema';

export const CouponRedemptionFindUniqueSchema: z.ZodType<Prisma.CouponRedemptionFindUniqueArgs> = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), include: CouponRedemptionIncludeObjectSchema.optional(), where: CouponRedemptionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CouponRedemptionFindUniqueArgs>;

export const CouponRedemptionFindUniqueZodSchema = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), include: CouponRedemptionIncludeObjectSchema.optional(), where: CouponRedemptionWhereUniqueInputObjectSchema }).strict();