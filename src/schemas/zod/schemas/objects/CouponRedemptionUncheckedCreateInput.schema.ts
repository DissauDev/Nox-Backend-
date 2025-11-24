import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  couponId: z.string(),
  userId: z.string().optional().nullable(),
  orderId: z.string().optional().nullable(),
  redeemedAt: z.coerce.date().optional()
}).strict();
export const CouponRedemptionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CouponRedemptionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionUncheckedCreateInput>;
export const CouponRedemptionUncheckedCreateInputObjectZodSchema = makeSchema();
