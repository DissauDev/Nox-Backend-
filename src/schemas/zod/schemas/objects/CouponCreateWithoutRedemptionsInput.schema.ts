import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponTypeSchema } from '../enums/CouponType.schema'

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
  updatedAt: z.coerce.date().optional()
}).strict();
export const CouponCreateWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.CouponCreateWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponCreateWithoutRedemptionsInput>;
export const CouponCreateWithoutRedemptionsInputObjectZodSchema = makeSchema();
