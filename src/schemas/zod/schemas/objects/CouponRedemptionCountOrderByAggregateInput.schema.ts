import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  couponId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  orderId: SortOrderSchema.optional(),
  redeemedAt: SortOrderSchema.optional()
}).strict();
export const CouponRedemptionCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CouponRedemptionCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionCountOrderByAggregateInput>;
export const CouponRedemptionCountOrderByAggregateInputObjectZodSchema = makeSchema();
