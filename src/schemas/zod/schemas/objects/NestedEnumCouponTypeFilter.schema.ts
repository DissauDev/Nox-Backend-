import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponTypeSchema } from '../enums/CouponType.schema'

const nestedenumcoupontypefilterSchema = z.object({
  equals: CouponTypeSchema.optional(),
  in: CouponTypeSchema.array().optional(),
  notIn: CouponTypeSchema.array().optional(),
  not: z.union([CouponTypeSchema, z.lazy(() => NestedEnumCouponTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumCouponTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumCouponTypeFilter> = nestedenumcoupontypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumCouponTypeFilter>;
export const NestedEnumCouponTypeFilterObjectZodSchema = nestedenumcoupontypefilterSchema;
