import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CouponRedemptionOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CouponRedemptionOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionOrderByRelationAggregateInput>;
export const CouponRedemptionOrderByRelationAggregateInputObjectZodSchema = makeSchema();
