import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  couponId: z.string(),
  userId: z.string().optional().nullable(),
  orderId: z.string().optional().nullable(),
  redeemedAt: z.coerce.date().optional()
}).strict();
export const CouponRedemptionCreateManyInputObjectSchema: z.ZodType<Prisma.CouponRedemptionCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionCreateManyInput>;
export const CouponRedemptionCreateManyInputObjectZodSchema = makeSchema();
