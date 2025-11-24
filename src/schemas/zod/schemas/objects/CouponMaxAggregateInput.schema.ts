import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  code: z.literal(true).optional(),
  type: z.literal(true).optional(),
  discountValue: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  isLimited: z.literal(true).optional(),
  usageLimit: z.literal(true).optional(),
  usageCount: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const CouponMaxAggregateInputObjectSchema: z.ZodType<Prisma.CouponMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CouponMaxAggregateInputType>;
export const CouponMaxAggregateInputObjectZodSchema = makeSchema();
