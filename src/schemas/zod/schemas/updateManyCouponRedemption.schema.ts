import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponRedemptionUpdateManyMutationInputObjectSchema as CouponRedemptionUpdateManyMutationInputObjectSchema } from './objects/CouponRedemptionUpdateManyMutationInput.schema';
import { CouponRedemptionWhereInputObjectSchema as CouponRedemptionWhereInputObjectSchema } from './objects/CouponRedemptionWhereInput.schema';

export const CouponRedemptionUpdateManySchema: z.ZodType<Prisma.CouponRedemptionUpdateManyArgs> = z.object({ data: CouponRedemptionUpdateManyMutationInputObjectSchema, where: CouponRedemptionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CouponRedemptionUpdateManyArgs>;

export const CouponRedemptionUpdateManyZodSchema = z.object({ data: CouponRedemptionUpdateManyMutationInputObjectSchema, where: CouponRedemptionWhereInputObjectSchema.optional() }).strict();