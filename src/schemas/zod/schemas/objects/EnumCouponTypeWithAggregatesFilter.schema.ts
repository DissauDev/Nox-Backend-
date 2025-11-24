import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponTypeSchema } from '../enums/CouponType.schema';
import { NestedEnumCouponTypeWithAggregatesFilterObjectSchema as NestedEnumCouponTypeWithAggregatesFilterObjectSchema } from './NestedEnumCouponTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCouponTypeFilterObjectSchema as NestedEnumCouponTypeFilterObjectSchema } from './NestedEnumCouponTypeFilter.schema'

const makeSchema = () => z.object({
  equals: CouponTypeSchema.optional(),
  in: CouponTypeSchema.array().optional(),
  notIn: CouponTypeSchema.array().optional(),
  not: z.union([CouponTypeSchema, z.lazy(() => NestedEnumCouponTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCouponTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCouponTypeFilterObjectSchema).optional()
}).strict();
export const EnumCouponTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumCouponTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCouponTypeWithAggregatesFilter>;
export const EnumCouponTypeWithAggregatesFilterObjectZodSchema = makeSchema();
