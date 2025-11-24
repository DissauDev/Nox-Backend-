import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  couponId: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  orderId: z.literal(true).optional(),
  redeemedAt: z.literal(true).optional()
}).strict();
export const CouponRedemptionMaxAggregateInputObjectSchema: z.ZodType<Prisma.CouponRedemptionMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionMaxAggregateInputType>;
export const CouponRedemptionMaxAggregateInputObjectZodSchema = makeSchema();
