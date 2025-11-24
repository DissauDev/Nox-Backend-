import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CouponOrderByWithRelationInputObjectSchema as CouponOrderByWithRelationInputObjectSchema } from './CouponOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  couponId: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  orderId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  redeemedAt: SortOrderSchema.optional(),
  coupon: z.lazy(() => CouponOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CouponRedemptionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CouponRedemptionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionOrderByWithRelationInput>;
export const CouponRedemptionOrderByWithRelationInputObjectZodSchema = makeSchema();
