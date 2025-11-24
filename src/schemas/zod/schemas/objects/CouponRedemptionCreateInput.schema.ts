import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponCreateNestedOneWithoutRedemptionsInputObjectSchema as CouponCreateNestedOneWithoutRedemptionsInputObjectSchema } from './CouponCreateNestedOneWithoutRedemptionsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  orderId: z.string().optional().nullable(),
  redeemedAt: z.coerce.date().optional(),
  coupon: z.lazy(() => CouponCreateNestedOneWithoutRedemptionsInputObjectSchema)
}).strict();
export const CouponRedemptionCreateInputObjectSchema: z.ZodType<Prisma.CouponRedemptionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionCreateInput>;
export const CouponRedemptionCreateInputObjectZodSchema = makeSchema();
