import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponRedemptionSelectObjectSchema as CouponRedemptionSelectObjectSchema } from './objects/CouponRedemptionSelect.schema';
import { CouponRedemptionUpdateManyMutationInputObjectSchema as CouponRedemptionUpdateManyMutationInputObjectSchema } from './objects/CouponRedemptionUpdateManyMutationInput.schema';
import { CouponRedemptionWhereInputObjectSchema as CouponRedemptionWhereInputObjectSchema } from './objects/CouponRedemptionWhereInput.schema';

export const CouponRedemptionUpdateManyAndReturnSchema: z.ZodType<Prisma.CouponRedemptionUpdateManyAndReturnArgs> = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), data: CouponRedemptionUpdateManyMutationInputObjectSchema, where: CouponRedemptionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CouponRedemptionUpdateManyAndReturnArgs>;

export const CouponRedemptionUpdateManyAndReturnZodSchema = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), data: CouponRedemptionUpdateManyMutationInputObjectSchema, where: CouponRedemptionWhereInputObjectSchema.optional() }).strict();