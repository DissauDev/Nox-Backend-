import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponTypeSchema } from '../enums/CouponType.schema';
import { CouponRedemptionCreateNestedManyWithoutCouponInputObjectSchema as CouponRedemptionCreateNestedManyWithoutCouponInputObjectSchema } from './CouponRedemptionCreateNestedManyWithoutCouponInput.schema'

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
  redemptions: z.lazy(() => CouponRedemptionCreateNestedManyWithoutCouponInputObjectSchema)
}).strict();
export const CouponCreateInputObjectSchema: z.ZodType<Prisma.CouponCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponCreateInput>;
export const CouponCreateInputObjectZodSchema = makeSchema();
