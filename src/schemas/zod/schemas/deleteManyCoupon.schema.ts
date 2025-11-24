import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponWhereInputObjectSchema as CouponWhereInputObjectSchema } from './objects/CouponWhereInput.schema';

export const CouponDeleteManySchema: z.ZodType<Prisma.CouponDeleteManyArgs> = z.object({ where: CouponWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CouponDeleteManyArgs>;

export const CouponDeleteManyZodSchema = z.object({ where: CouponWhereInputObjectSchema.optional() }).strict();