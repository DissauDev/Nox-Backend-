import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponRedemptionSelectObjectSchema as CouponRedemptionSelectObjectSchema } from './CouponRedemptionSelect.schema';
import { CouponRedemptionIncludeObjectSchema as CouponRedemptionIncludeObjectSchema } from './CouponRedemptionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CouponRedemptionSelectObjectSchema).optional(),
  include: z.lazy(() => CouponRedemptionIncludeObjectSchema).optional()
}).strict();
export const CouponRedemptionArgsObjectSchema = makeSchema();
export const CouponRedemptionArgsObjectZodSchema = makeSchema();
