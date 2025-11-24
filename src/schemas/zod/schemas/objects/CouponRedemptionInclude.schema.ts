import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponArgsObjectSchema as CouponArgsObjectSchema } from './CouponArgs.schema'

const makeSchema = () => z.object({
  coupon: z.union([z.boolean(), z.lazy(() => CouponArgsObjectSchema)]).optional()
}).strict();
export const CouponRedemptionIncludeObjectSchema: z.ZodType<Prisma.CouponRedemptionInclude> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionInclude>;
export const CouponRedemptionIncludeObjectZodSchema = makeSchema();
