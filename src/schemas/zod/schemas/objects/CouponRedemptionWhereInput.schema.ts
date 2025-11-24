import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CouponScalarRelationFilterObjectSchema as CouponScalarRelationFilterObjectSchema } from './CouponScalarRelationFilter.schema';
import { CouponWhereInputObjectSchema as CouponWhereInputObjectSchema } from './CouponWhereInput.schema'

const couponredemptionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CouponRedemptionWhereInputObjectSchema), z.lazy(() => CouponRedemptionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CouponRedemptionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CouponRedemptionWhereInputObjectSchema), z.lazy(() => CouponRedemptionWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  couponId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  orderId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  redeemedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  coupon: z.union([z.lazy(() => CouponScalarRelationFilterObjectSchema), z.lazy(() => CouponWhereInputObjectSchema)]).optional()
}).strict();
export const CouponRedemptionWhereInputObjectSchema: z.ZodType<Prisma.CouponRedemptionWhereInput> = couponredemptionwhereinputSchema as unknown as z.ZodType<Prisma.CouponRedemptionWhereInput>;
export const CouponRedemptionWhereInputObjectZodSchema = couponredemptionwhereinputSchema;
