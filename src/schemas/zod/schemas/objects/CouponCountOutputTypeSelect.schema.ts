import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponCountOutputTypeCountRedemptionsArgsObjectSchema as CouponCountOutputTypeCountRedemptionsArgsObjectSchema } from './CouponCountOutputTypeCountRedemptionsArgs.schema'

const makeSchema = () => z.object({
  redemptions: z.union([z.boolean(), z.lazy(() => CouponCountOutputTypeCountRedemptionsArgsObjectSchema)]).optional()
}).strict();
export const CouponCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CouponCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CouponCountOutputTypeSelect>;
export const CouponCountOutputTypeSelectObjectZodSchema = makeSchema();
