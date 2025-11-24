import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const couponredemptionscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CouponRedemptionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CouponRedemptionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CouponRedemptionScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CouponRedemptionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CouponRedemptionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  couponId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  orderId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  redeemedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CouponRedemptionScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CouponRedemptionScalarWhereWithAggregatesInput> = couponredemptionscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CouponRedemptionScalarWhereWithAggregatesInput>;
export const CouponRedemptionScalarWhereWithAggregatesInputObjectZodSchema = couponredemptionscalarwherewithaggregatesinputSchema;
