import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponRedemptionWhereInputObjectSchema as CouponRedemptionWhereInputObjectSchema } from './CouponRedemptionWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CouponRedemptionWhereInputObjectSchema).optional(),
  some: z.lazy(() => CouponRedemptionWhereInputObjectSchema).optional(),
  none: z.lazy(() => CouponRedemptionWhereInputObjectSchema).optional()
}).strict();
export const CouponRedemptionListRelationFilterObjectSchema: z.ZodType<Prisma.CouponRedemptionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionListRelationFilter>;
export const CouponRedemptionListRelationFilterObjectZodSchema = makeSchema();
