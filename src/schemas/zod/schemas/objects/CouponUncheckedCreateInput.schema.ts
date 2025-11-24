import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponTypeSchema } from '../enums/CouponType.schema';
import { CouponRedemptionUncheckedCreateNestedManyWithoutCouponInputObjectSchema as CouponRedemptionUncheckedCreateNestedManyWithoutCouponInputObjectSchema } from './CouponRedemptionUncheckedCreateNestedManyWithoutCouponInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  code: z.string(),
  type: CouponTypeSchema,
  discountValue: z.number(),
  expiresAt: z.coerce.date().optional().nullable(),
  isLimited: z.boolean().optional(),
  usageLimit: z.number().int().optional().nullable(),
  usageCount: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  redemptions: z.lazy(() => CouponRedemptionUncheckedCreateNestedManyWithoutCouponInputObjectSchema)
}).strict();
export const CouponUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CouponUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponUncheckedCreateInput>;
export const CouponUncheckedCreateInputObjectZodSchema = makeSchema();
