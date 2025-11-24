import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponCreateManyInputObjectSchema as CouponCreateManyInputObjectSchema } from './objects/CouponCreateManyInput.schema';

export const CouponCreateManySchema: z.ZodType<Prisma.CouponCreateManyArgs> = z.object({ data: z.union([ CouponCreateManyInputObjectSchema, z.array(CouponCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CouponCreateManyArgs>;

export const CouponCreateManyZodSchema = z.object({ data: z.union([ CouponCreateManyInputObjectSchema, z.array(CouponCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();