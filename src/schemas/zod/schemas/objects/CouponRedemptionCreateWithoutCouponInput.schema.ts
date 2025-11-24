import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  orderId: z.string().optional().nullable(),
  redeemedAt: z.coerce.date().optional()
}).strict();
export const CouponRedemptionCreateWithoutCouponInputObjectSchema: z.ZodType<Prisma.CouponRedemptionCreateWithoutCouponInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionCreateWithoutCouponInput>;
export const CouponRedemptionCreateWithoutCouponInputObjectZodSchema = makeSchema();
