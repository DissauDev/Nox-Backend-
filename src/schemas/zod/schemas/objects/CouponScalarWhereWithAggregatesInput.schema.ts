import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumCouponTypeWithAggregatesFilterObjectSchema as EnumCouponTypeWithAggregatesFilterObjectSchema } from './EnumCouponTypeWithAggregatesFilter.schema';
import { CouponTypeSchema } from '../enums/CouponType.schema';
import { FloatWithAggregatesFilterObjectSchema as FloatWithAggregatesFilterObjectSchema } from './FloatWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema as IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const couponscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CouponScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CouponScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CouponScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CouponScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CouponScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  code: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumCouponTypeWithAggregatesFilterObjectSchema), CouponTypeSchema]).optional(),
  discountValue: z.union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  isLimited: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  usageLimit: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  usageCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CouponScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CouponScalarWhereWithAggregatesInput> = couponscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CouponScalarWhereWithAggregatesInput>;
export const CouponScalarWhereWithAggregatesInputObjectZodSchema = couponscalarwherewithaggregatesinputSchema;
