import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  discountValue: SortOrderSchema.optional(),
  usageLimit: SortOrderSchema.optional(),
  usageCount: SortOrderSchema.optional()
}).strict();
export const CouponSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CouponSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponSumOrderByAggregateInput>;
export const CouponSumOrderByAggregateInputObjectZodSchema = makeSchema();
