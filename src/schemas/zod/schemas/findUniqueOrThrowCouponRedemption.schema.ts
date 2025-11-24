import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponRedemptionSelectObjectSchema as CouponRedemptionSelectObjectSchema } from './objects/CouponRedemptionSelect.schema';
import { CouponRedemptionIncludeObjectSchema as CouponRedemptionIncludeObjectSchema } from './objects/CouponRedemptionInclude.schema';
import { CouponRedemptionWhereUniqueInputObjectSchema as CouponRedemptionWhereUniqueInputObjectSchema } from './objects/CouponRedemptionWhereUniqueInput.schema';

export const CouponRedemptionFindUniqueOrThrowSchema: z.ZodType<Prisma.CouponRedemptionFindUniqueOrThrowArgs> = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), include: CouponRedemptionIncludeObjectSchema.optional(), where: CouponRedemptionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CouponRedemptionFindUniqueOrThrowArgs>;

export const CouponRedemptionFindUniqueOrThrowZodSchema = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), include: CouponRedemptionIncludeObjectSchema.optional(), where: CouponRedemptionWhereUniqueInputObjectSchema }).strict();