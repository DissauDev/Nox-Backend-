import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponRedemptionFindManySchema as CouponRedemptionFindManySchema } from '../findManyCouponRedemption.schema';
import { CouponCountOutputTypeArgsObjectSchema as CouponCountOutputTypeArgsObjectSchema } from './CouponCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  code: z.boolean().optional(),
  type: z.boolean().optional(),
  discountValue: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  isLimited: z.boolean().optional(),
  usageLimit: z.boolean().optional(),
  usageCount: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  redemptions: z.union([z.boolean(), z.lazy(() => CouponRedemptionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CouponCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CouponSelectObjectSchema: z.ZodType<Prisma.CouponSelect> = makeSchema() as unknown as z.ZodType<Prisma.CouponSelect>;
export const CouponSelectObjectZodSchema = makeSchema();
