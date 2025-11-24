import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponRedemptionWhereInputObjectSchema as CouponRedemptionWhereInputObjectSchema } from './CouponRedemptionWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CouponRedemptionWhereInputObjectSchema).optional()
}).strict();
export const CouponCountOutputTypeCountRedemptionsArgsObjectSchema = makeSchema();
export const CouponCountOutputTypeCountRedemptionsArgsObjectZodSchema = makeSchema();
