import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumCouponTypeFilterObjectSchema as EnumCouponTypeFilterObjectSchema } from './EnumCouponTypeFilter.schema';
import { CouponTypeSchema } from '../enums/CouponType.schema';
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from './FloatFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CouponRedemptionListRelationFilterObjectSchema as CouponRedemptionListRelationFilterObjectSchema } from './CouponRedemptionListRelationFilter.schema'

const couponwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CouponWhereInputObjectSchema), z.lazy(() => CouponWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CouponWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CouponWhereInputObjectSchema), z.lazy(() => CouponWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  code: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumCouponTypeFilterObjectSchema), CouponTypeSchema]).optional(),
  discountValue: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  isLimited: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  usageLimit: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  usageCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  redemptions: z.lazy(() => CouponRedemptionListRelationFilterObjectSchema).optional()
}).strict();
export const CouponWhereInputObjectSchema: z.ZodType<Prisma.CouponWhereInput> = couponwhereinputSchema as unknown as z.ZodType<Prisma.CouponWhereInput>;
export const CouponWhereInputObjectZodSchema = couponwhereinputSchema;
