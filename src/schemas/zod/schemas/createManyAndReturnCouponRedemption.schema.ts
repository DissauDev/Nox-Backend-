import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponRedemptionSelectObjectSchema as CouponRedemptionSelectObjectSchema } from './objects/CouponRedemptionSelect.schema';
import { CouponRedemptionCreateManyInputObjectSchema as CouponRedemptionCreateManyInputObjectSchema } from './objects/CouponRedemptionCreateManyInput.schema';

export const CouponRedemptionCreateManyAndReturnSchema: z.ZodType<Prisma.CouponRedemptionCreateManyAndReturnArgs> = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), data: z.union([ CouponRedemptionCreateManyInputObjectSchema, z.array(CouponRedemptionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CouponRedemptionCreateManyAndReturnArgs>;

export const CouponRedemptionCreateManyAndReturnZodSchema = z.object({ select: CouponRedemptionSelectObjectSchema.optional(), data: z.union([ CouponRedemptionCreateManyInputObjectSchema, z.array(CouponRedemptionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();