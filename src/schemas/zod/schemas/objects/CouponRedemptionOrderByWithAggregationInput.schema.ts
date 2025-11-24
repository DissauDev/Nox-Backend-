import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CouponRedemptionCountOrderByAggregateInputObjectSchema as CouponRedemptionCountOrderByAggregateInputObjectSchema } from './CouponRedemptionCountOrderByAggregateInput.schema';
import { CouponRedemptionMaxOrderByAggregateInputObjectSchema as CouponRedemptionMaxOrderByAggregateInputObjectSchema } from './CouponRedemptionMaxOrderByAggregateInput.schema';
import { CouponRedemptionMinOrderByAggregateInputObjectSchema as CouponRedemptionMinOrderByAggregateInputObjectSchema } from './CouponRedemptionMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  couponId: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  orderId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  redeemedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CouponRedemptionCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CouponRedemptionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CouponRedemptionMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CouponRedemptionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CouponRedemptionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionOrderByWithAggregationInput>;
export const CouponRedemptionOrderByWithAggregationInputObjectZodSchema = makeSchema();
