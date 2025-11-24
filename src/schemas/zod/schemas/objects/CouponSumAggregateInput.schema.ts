import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  discountValue: z.literal(true).optional(),
  usageLimit: z.literal(true).optional(),
  usageCount: z.literal(true).optional()
}).strict();
export const CouponSumAggregateInputObjectSchema: z.ZodType<Prisma.CouponSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CouponSumAggregateInputType>;
export const CouponSumAggregateInputObjectZodSchema = makeSchema();
