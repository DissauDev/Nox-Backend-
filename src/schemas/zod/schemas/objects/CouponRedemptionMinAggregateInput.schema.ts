import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  couponId: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  orderId: z.literal(true).optional(),
  redeemedAt: z.literal(true).optional()
}).strict();
export const CouponRedemptionMinAggregateInputObjectSchema: z.ZodType<Prisma.CouponRedemptionMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionMinAggregateInputType>;
export const CouponRedemptionMinAggregateInputObjectZodSchema = makeSchema();
