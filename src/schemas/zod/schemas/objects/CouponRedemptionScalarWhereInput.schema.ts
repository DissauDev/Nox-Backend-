import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const couponredemptionscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CouponRedemptionScalarWhereInputObjectSchema), z.lazy(() => CouponRedemptionScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CouponRedemptionScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CouponRedemptionScalarWhereInputObjectSchema), z.lazy(() => CouponRedemptionScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  couponId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  orderId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  redeemedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CouponRedemptionScalarWhereInputObjectSchema: z.ZodType<Prisma.CouponRedemptionScalarWhereInput> = couponredemptionscalarwhereinputSchema as unknown as z.ZodType<Prisma.CouponRedemptionScalarWhereInput>;
export const CouponRedemptionScalarWhereInputObjectZodSchema = couponredemptionscalarwhereinputSchema;
