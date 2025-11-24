import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CouponCountOrderByAggregateInputObjectSchema as CouponCountOrderByAggregateInputObjectSchema } from './CouponCountOrderByAggregateInput.schema';
import { CouponAvgOrderByAggregateInputObjectSchema as CouponAvgOrderByAggregateInputObjectSchema } from './CouponAvgOrderByAggregateInput.schema';
import { CouponMaxOrderByAggregateInputObjectSchema as CouponMaxOrderByAggregateInputObjectSchema } from './CouponMaxOrderByAggregateInput.schema';
import { CouponMinOrderByAggregateInputObjectSchema as CouponMinOrderByAggregateInputObjectSchema } from './CouponMinOrderByAggregateInput.schema';
import { CouponSumOrderByAggregateInputObjectSchema as CouponSumOrderByAggregateInputObjectSchema } from './CouponSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  discountValue: SortOrderSchema.optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isLimited: SortOrderSchema.optional(),
  usageLimit: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  usageCount: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CouponCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CouponAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CouponMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CouponMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CouponSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CouponOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CouponOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponOrderByWithAggregationInput>;
export const CouponOrderByWithAggregationInputObjectZodSchema = makeSchema();
