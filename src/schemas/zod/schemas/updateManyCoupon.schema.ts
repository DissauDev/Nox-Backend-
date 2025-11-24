import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponUpdateManyMutationInputObjectSchema as CouponUpdateManyMutationInputObjectSchema } from './objects/CouponUpdateManyMutationInput.schema';
import { CouponWhereInputObjectSchema as CouponWhereInputObjectSchema } from './objects/CouponWhereInput.schema';

export const CouponUpdateManySchema: z.ZodType<Prisma.CouponUpdateManyArgs> = z.object({ data: CouponUpdateManyMutationInputObjectSchema, where: CouponWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CouponUpdateManyArgs>;

export const CouponUpdateManyZodSchema = z.object({ data: CouponUpdateManyMutationInputObjectSchema, where: CouponWhereInputObjectSchema.optional() }).strict();