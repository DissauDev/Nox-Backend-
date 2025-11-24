import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponArgsObjectSchema as CouponArgsObjectSchema } from './CouponArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  coupon: z.union([z.boolean(), z.lazy(() => CouponArgsObjectSchema)]).optional(),
  couponId: z.boolean().optional(),
  userId: z.boolean().optional(),
  orderId: z.boolean().optional(),
  redeemedAt: z.boolean().optional()
}).strict();
export const CouponRedemptionSelectObjectSchema: z.ZodType<Prisma.CouponRedemptionSelect> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionSelect>;
export const CouponRedemptionSelectObjectZodSchema = makeSchema();
