import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponSelectObjectSchema as CouponSelectObjectSchema } from './objects/CouponSelect.schema';
import { CouponUpdateManyMutationInputObjectSchema as CouponUpdateManyMutationInputObjectSchema } from './objects/CouponUpdateManyMutationInput.schema';
import { CouponWhereInputObjectSchema as CouponWhereInputObjectSchema } from './objects/CouponWhereInput.schema';

export const CouponUpdateManyAndReturnSchema: z.ZodType<Prisma.CouponUpdateManyAndReturnArgs> = z.object({ select: CouponSelectObjectSchema.optional(), data: CouponUpdateManyMutationInputObjectSchema, where: CouponWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CouponUpdateManyAndReturnArgs>;

export const CouponUpdateManyAndReturnZodSchema = z.object({ select: CouponSelectObjectSchema.optional(), data: CouponUpdateManyMutationInputObjectSchema, where: CouponWhereInputObjectSchema.optional() }).strict();