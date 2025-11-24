import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponRedemptionSelectObjectSchema as CouponRedemptionSelectObjectSchema } from './objects/CouponRedemptionSelect.schema';
import { CouponRedemptionIncludeObjectSchema as CouponRedemptionIncludeObjectSchema } from './objects/CouponRedemptionInclude.schema';
import { CouponRedemptionWhereUniqueInputObjectSchema as CouponRedemptionWhereUniqueInputObjectSchema } from './objects/CouponRedemptionWhereUniqueInput.schema';
import { CouponRedemptionCreateInputObjectSchema as CouponRedemptionCreateInputObjectSchema } from './objects/CouponRedemptionCreateInput.schema';
import { CouponRedemptionUncheckedCreateInputObjectSchema as CouponRedemptionUncheckedCreateInputObjectSchema } from './objects/CouponRedemptionUncheckedCreateInput.schema';
import { CouponRedemptionUpdateInputObjectSchema as CouponRedemptionUpdateInputObjectSchema } from './objects/CouponRedemptionUpdateInput.schema';
import { CouponRedemptionUncheckedUpdateInputObjectSchema as CouponRedemptionUncheckedUpdateInputObjectSchema } from './objects/CouponRedemptionUncheckedUpdateInput.schema';

export const CouponRedemptionUpsertOneSchema: z.ZodType<Prisma.CouponRedemptionUpsertArgs> = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), include: CouponRedemptionIncludeObjectSchema.optional(), where: CouponRedemptionWhereUniqueInputObjectSchema, create: z.union([ CouponRedemptionCreateInputObjectSchema, CouponRedemptionUncheckedCreateInputObjectSchema ]), update: z.union([ CouponRedemptionUpdateInputObjectSchema, CouponRedemptionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CouponRedemptionUpsertArgs>;

export const CouponRedemptionUpsertOneZodSchema = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), include: CouponRedemptionIncludeObjectSchema.optional(), where: CouponRedemptionWhereUniqueInputObjectSchema, create: z.union([ CouponRedemptionCreateInputObjectSchema, CouponRedemptionUncheckedCreateInputObjectSchema ]), update: z.union([ CouponRedemptionUpdateInputObjectSchema, CouponRedemptionUncheckedUpdateInputObjectSchema ]) }).strict();