import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponSelectObjectSchema as CouponSelectObjectSchema } from './objects/CouponSelect.schema';
import { CouponCreateManyInputObjectSchema as CouponCreateManyInputObjectSchema } from './objects/CouponCreateManyInput.schema';

export const CouponCreateManyAndReturnSchema: z.ZodType<Prisma.CouponCreateManyAndReturnArgs> = z.object({ select: CouponSelectObjectSchema.optional(), data: z.union([ CouponCreateManyInputObjectSchema, z.array(CouponCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CouponCreateManyAndReturnArgs>;

export const CouponCreateManyAndReturnZodSchema = z.object({ select: CouponSelectObjectSchema.optional(), data: z.union([ CouponCreateManyInputObjectSchema, z.array(CouponCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();