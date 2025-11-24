import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponRedemptionWhereInputObjectSchema as CouponRedemptionWhereInputObjectSchema } from './objects/CouponRedemptionWhereInput.schema';

export const CouponRedemptionDeleteManySchema: z.ZodType<Prisma.CouponRedemptionDeleteManyArgs> = z.object({ where: CouponRedemptionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CouponRedemptionDeleteManyArgs>;

export const CouponRedemptionDeleteManyZodSchema = z.object({ where: CouponRedemptionWhereInputObjectSchema.optional() }).strict();