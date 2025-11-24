import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponRedemptionCreateManyInputObjectSchema as CouponRedemptionCreateManyInputObjectSchema } from './objects/CouponRedemptionCreateManyInput.schema';

export const CouponRedemptionCreateManySchema: z.ZodType<Prisma.CouponRedemptionCreateManyArgs> = z.object({ data: z.union([ CouponRedemptionCreateManyInputObjectSchema, z.array(CouponRedemptionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CouponRedemptionCreateManyArgs>;

export const CouponRedemptionCreateManyZodSchema = z.object({ data: z.union([ CouponRedemptionCreateManyInputObjectSchema, z.array(CouponRedemptionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();