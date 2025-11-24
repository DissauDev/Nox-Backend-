import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CouponRedemptionOrderByRelationAggregateInputObjectSchema as CouponRedemptionOrderByRelationAggregateInputObjectSchema } from './CouponRedemptionOrderByRelationAggregateInput.schema'

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
  redemptions: z.lazy(() => CouponRedemptionOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const CouponOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CouponOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponOrderByWithRelationInput>;
export const CouponOrderByWithRelationInputObjectZodSchema = makeSchema();
