import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponTypeSchema } from '../enums/CouponType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCouponTypeFilterObjectSchema as NestedEnumCouponTypeFilterObjectSchema } from './NestedEnumCouponTypeFilter.schema'

const nestedenumcoupontypewithaggregatesfilterSchema = z.object({
  equals: CouponTypeSchema.optional(),
  in: CouponTypeSchema.array().optional(),
  notIn: CouponTypeSchema.array().optional(),
  not: z.union([CouponTypeSchema, z.lazy(() => NestedEnumCouponTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCouponTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCouponTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumCouponTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCouponTypeWithAggregatesFilter> = nestedenumcoupontypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCouponTypeWithAggregatesFilter>;
export const NestedEnumCouponTypeWithAggregatesFilterObjectZodSchema = nestedenumcoupontypewithaggregatesfilterSchema;
