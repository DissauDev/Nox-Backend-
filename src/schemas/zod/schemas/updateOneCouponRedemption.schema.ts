import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponRedemptionSelectObjectSchema as CouponRedemptionSelectObjectSchema } from './objects/CouponRedemptionSelect.schema';
import { CouponRedemptionIncludeObjectSchema as CouponRedemptionIncludeObjectSchema } from './objects/CouponRedemptionInclude.schema';
import { CouponRedemptionUpdateInputObjectSchema as CouponRedemptionUpdateInputObjectSchema } from './objects/CouponRedemptionUpdateInput.schema';
import { CouponRedemptionUncheckedUpdateInputObjectSchema as CouponRedemptionUncheckedUpdateInputObjectSchema } from './objects/CouponRedemptionUncheckedUpdateInput.schema';
import { CouponRedemptionWhereUniqueInputObjectSchema as CouponRedemptionWhereUniqueInputObjectSchema } from './objects/CouponRedemptionWhereUniqueInput.schema';

export const CouponRedemptionUpdateOneSchema: z.ZodType<Prisma.CouponRedemptionUpdateArgs> = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), include: CouponRedemptionIncludeObjectSchema.optional(), data: z.union([CouponRedemptionUpdateInputObjectSchema, CouponRedemptionUncheckedUpdateInputObjectSchema]), where: CouponRedemptionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CouponRedemptionUpdateArgs>;

export const CouponRedemptionUpdateOneZodSchema = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), include: CouponRedemptionIncludeObjectSchema.optional(), data: z.union([CouponRedemptionUpdateInputObjectSchema, CouponRedemptionUncheckedUpdateInputObjectSchema]), where: CouponRedemptionWhereUniqueInputObjectSchema }).strict();