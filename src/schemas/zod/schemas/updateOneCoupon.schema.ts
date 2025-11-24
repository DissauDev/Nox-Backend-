import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponSelectObjectSchema as CouponSelectObjectSchema } from './objects/CouponSelect.schema';
import { CouponIncludeObjectSchema as CouponIncludeObjectSchema } from './objects/CouponInclude.schema';
import { CouponUpdateInputObjectSchema as CouponUpdateInputObjectSchema } from './objects/CouponUpdateInput.schema';
import { CouponUncheckedUpdateInputObjectSchema as CouponUncheckedUpdateInputObjectSchema } from './objects/CouponUncheckedUpdateInput.schema';
import { CouponWhereUniqueInputObjectSchema as CouponWhereUniqueInputObjectSchema } from './objects/CouponWhereUniqueInput.schema';

export const CouponUpdateOneSchema: z.ZodType<Prisma.CouponUpdateArgs> = z.object({ select: CouponSelectObjectSchema.optional(), include: CouponIncludeObjectSchema.optional(), data: z.union([CouponUpdateInputObjectSchema, CouponUncheckedUpdateInputObjectSchema]), where: CouponWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CouponUpdateArgs>;

export const CouponUpdateOneZodSchema = z.object({ select: CouponSelectObjectSchema.optional(), include: CouponIncludeObjectSchema.optional(), data: z.union([CouponUpdateInputObjectSchema, CouponUncheckedUpdateInputObjectSchema]), where: CouponWhereUniqueInputObjectSchema }).strict();